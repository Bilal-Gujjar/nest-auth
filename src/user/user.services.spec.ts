import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
 
  it('should create a user', async () => {
    const user = new User();
    user.username = 'test';
    user.password = 'test';

    jest.spyOn(userRepository, 'save').mockResolvedValue(user);

    expect(await userService.create(user)).toBe(user);
    console.log(user);
  });
  
  it('should find all users', async () => {
    const user = [];
    jest.spyOn(userRepository, 'find').mockResolvedValue(user);

    expect(await userService.findAll()).toBe(user);
    console.log(user);
  });
 
});
