import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUser: User): Promise<User> {
    let user = new User();
    user.username = createUser.username;
    user.password = createUser.password;
    user.email = createUser.email;
    user.role = createUser.role;
    return this.userRepository.save(user);
  }

  //find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  //find the user by username
  async getUserbyUsername(username: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }
  //find the user and update the password
  async updatePassword(username: string, password: string): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    user.password = password;
    return await this.userRepository.save(user);
  }

  //find the by id and update the password
  async updatePasswordById(id: number, password: string): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    user.password = password;
    return await this.userRepository.save(user);
  }

  //find the user by id and delete password
  async deletePasswordById(id: number): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    user.password = '';
    return await this.userRepository.save(user);
  }

  //add new password to the user
  async addPasswordById(id: number, password: string): Promise<User> {
    let user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    user.password = password;
    return await this.userRepository.save(user);
  }
}
