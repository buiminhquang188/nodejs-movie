import { HttpStatus } from 'http-status';
import { HttpException } from './../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { Authorized, Body, ContentType, Controller, Post, Req, Res } from 'routing-controllers';
import { Transaction } from 'typeorm';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
class AuthController {
  public authService = new AuthService();

  @Post('/signUp')
  @ContentType('application/json')
  @Body({ required: true })
  async signUp(@Body() userData: CreateUserDto): Promise<any> {
    const signUpUserData: User = await this.authService.signup(userData);

    return signUpUserData;
  }

  @Post('/signIn')
  @Transaction()
  async Login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  }

  @Post('/logout')
  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Authorized()
  @Transaction()
  async logOut(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
