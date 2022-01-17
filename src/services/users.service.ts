import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { UserCreateDto, UpdateUserDto, CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entity/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import httpStatus from 'http-status';

class UserService {
  public users = UserEntity;

  public async findAllUser(): Promise<User[]> {
    const userRepository = getRepository(this.users);
    const users: User[] = await userRepository.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(httpStatus.BAD_REQUEST, 'ID must not empty');
    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(httpStatus.CONFLICT, 'User not found or has been deleted');

    return findUser;
  }

  public async createUser(userData: CreateUserDto, currentUser: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(httpStatus.BAD_REQUEST, 'Request must not empty');

    const userRepository = getRepository(this.users);

    const hashedPassword = await bcrypt.hash('newuser', 10);
    const createUserData: User = await userRepository.save({ ...userData, password: hashedPassword, createdBy: currentUser.id });
    return createUserData;
  }

  public async updateUser(userData: UpdateUserDto, currentUser: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(httpStatus.BAD_REQUEST, 'Request must not empty');

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userData.id } });
    if (!findUser) throw new HttpException(httpStatus.CONFLICT, 'User not found or has been deleted');

    await userRepository.update(userData.id, { ...userData, updatedBy: currentUser.id });

    const updateUser: User = await userRepository.findOne({ where: { id: userData.id } });
    return updateUser;
  }

  public async deleteUser(userId: number, currentUser: User): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(httpStatus.BAD_REQUEST, 'ID must not empty');

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(httpStatus.CONFLICT, 'User not found or has been deleted');

    await userRepository.update(userId, { updatedBy: currentUser.id });
    await userRepository.softDelete({ id: userId });

    const deletedUser: User = await userRepository.findOne({ where: { id: userId } });

    return deletedUser;
  }

  public async resetPassword(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(httpStatus.BAD_REQUEST, 'ID must not empty');

    const userRepository = getRepository(this.users);
    const findUser: User = await userRepository.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(httpStatus.CONFLICT, 'User not found or has been deleted');

    const hashedPassword = await bcrypt.hash('newuser', 10);
    await userRepository.update(userId, { password: hashedPassword });

    const updateUser: User = await userRepository.findOne({ where: { id: userId } });
    return updateUser;
  }
}

export default UserService;
