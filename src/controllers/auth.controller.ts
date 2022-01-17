import { HttpStatus } from 'http-status';
import { HttpException } from './../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import { UserCreateDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { Authorized, Body, ContentType, Controller, CurrentUser, Header, Post, Req, Res } from 'routing-controllers';
import { Transaction } from 'typeorm';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
class AuthController {
  public authService = new AuthService();

  @Post('/signUp')
  @ContentType('application/json')
  @Body({ required: true })
  async signUp(@Body() userData: UserCreateDto): Promise<any> {
    const signUpUserData: User = await this.authService.signup(userData);

    return signUpUserData;
  }

  @Post('/login')
  @OpenAPI({
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginUserDto',
          },
          example: {
            email: 'admin@example.com',
            password: 'admin',
          },
        },
      },
    },
  })
  @ContentType('application/json')
  @Body({ required: true })
  async Login(@Body() userData: LoginUserDto): Promise<{ data: any; message: string }> {
    const tokenData = await this.authService.login(userData);

    return { data: tokenData, message: 'login' };
  }

  @Post('/logout')
  @OpenAPI({
    security: [{ BearerAuth: [] }],
  })
  @Authorized()
  @ContentType('application/json')
  async logOut(@CurrentUser() currentUser: User): Promise<{ message: string }> {
    await this.authService.logout(currentUser);
    return { message: 'logout' };
  }
}

export default AuthController;
