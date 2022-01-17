import { NextFunction, Request, Response } from 'express';
import { UserCreateDto, UpdateUserDto, CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { Authorized, Body, ContentType, Controller, CurrentUser, Delete, Get, Param, Post, Put } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Roles } from '@/utils/enum';

@Controller()
@OpenAPI({
  security: [{ BearerAuth: [] }],
})
class UsersManagerController {
  public userService = new userService();

  @Get('/users')
  @Authorized()
  @ContentType('application/json')
  async getUsers(): Promise<{ data: User[]; message: string }> {
    const findAllUsersData: User[] = await this.userService.findAllUser();

    return { data: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @Authorized()
  @ContentType('application/json')
  async getUserById(@Param('id') userId: number): Promise<{ data: User; message: string }> {
    const findOneUserData: User = await this.userService.findUserById(userId);

    return { data: findOneUserData, message: 'findOne' };
  }

  @Post('/users')
  @Authorized()
  @ContentType('application/json')
  async createUser(@Body() userData: CreateUserDto, @CurrentUser() currentUser: User): Promise<{ data: User; message: string }> {
    const createUserData: User = await this.userService.createUser(userData, currentUser);

    return { data: createUserData, message: 'created' };
  }

  @Put('/users')
  @Authorized()
  @ContentType('application/json')
  async updateUser(@Body() userData: UpdateUserDto, @CurrentUser() currentUser: User): Promise<{ data: User; message: string }> {
    const updateUserData: User = await this.userService.updateUser(userData, currentUser);

    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users/:id')
  @Authorized()
  @ContentType('application/json')
  async deleteUser(@Param('id') userId: number, @CurrentUser() currentUser: User): Promise<{ data: User; message: string }> {
    const deleteUserData: User = await this.userService.deleteUser(userId, currentUser);

    return { data: deleteUserData, message: 'deleted' };
  }

  @Post('/users/:id')
  @Authorized()
  @ContentType('application/json')
  async resetPassword(@Param('id') userId: number): Promise<{ data: User; message: string }> {
    const resetPasswordData: User = await this.userService.resetPassword(userId);

    return { data: resetPasswordData, message: 'reset password' };
  }
}

export default UsersManagerController;
