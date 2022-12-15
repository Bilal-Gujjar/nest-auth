import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller('app')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  //API END POINTS

  @Post('/signup')
  //create user in database
  async register(@Body() createUserDto: User): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  //get all users in database
  @Get('/users')
  async public(): Promise<User[]> {
    return await this.userService.findAll();
  }
  //Login and Get JWT
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<string> {
    return this.authService.generateJWT(req.user);
  }

  //Login With JWT
  @Get('/login')
  @UseGuards(AuthGuard('jwt'))
  async loginJWT(@Request() req): Promise<string> {
    return 'Web Developer Private Api' + JSON.stringify(req.user);
  }
  //update user password in database
  @Patch('/login')
  async updatePassword(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.userService.updatePassword(username, password);
  }
  //delete password in database
  @Delete('/login')
  async deletePassword(@Body('id') id: number): Promise<User> {
    return await this.userService.deletePasswordById(id);
  }
  //add new user password in database
  @Post('/login-new')
  async addNewPassword(
    @Body('id') id: number,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.userService.updatePasswordById(id, password);
  }
}
