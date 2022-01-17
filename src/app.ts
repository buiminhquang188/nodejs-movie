process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';

import { createConnection, getRepository } from 'typeorm';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { stream } from '@utils/logger';
import { Action, Controller, getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { DataStoredInToken } from './interfaces/auth.interface';
import { UserEntity } from './entity/users.entity';
import { HttpException } from './exceptions/HttpException';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(Controllers);
    this.initializeSwagger(Controllers);
    this.initializeErrorHandling();
    this.app.set('trust proxy', true);
  }

  public listen() {
    this.app.listen(this.port);
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: {
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      },
      controllers: controllers,
      defaultErrorHandler: false,
      authorizationChecker: async (action: Action) => {
        try {
          const token = action.request.header('Authorization')?.split('Bearer ')[1] || null;
          const secretKey: string = config.get('secretKey');
          const verificationResponse = jwt.verify(token, secretKey) as DataStoredInToken;
          const userId = verificationResponse.id;

          const userRepository = getRepository(UserEntity);
          const findUser: UserEntity = await userRepository.findOne(userId);
          if (findUser) {
            return true;
          }
          throw new HttpException(httpStatus.UNAUTHORIZED, 'User is not permission');
        } catch (error) {
          throw new HttpException(httpStatus.UNAUTHORIZED, error.message);
        }
      },
      currentUserChecker: async (action: Action) => {
        try {
          const token: string = action.request.header('Authorization')?.split('Bearer ')[1] || null;
          const secretKey: string = config.get('secretKey');
          const verificationResponse = jwt.verify(token, secretKey) as DataStoredInToken;
          const userId = verificationResponse.id;

          const userRepository = getRepository(UserEntity);
          const findUser: UserEntity = await userRepository.findOne(userId);

          return findUser;
        } catch (error) {
          return null;
        }
      },
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          BearerAuth: {
            scheme: 'bearer',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Movie Booking',
        title: 'Movie Cinema API',
        version: '1.0.0',
      },
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
