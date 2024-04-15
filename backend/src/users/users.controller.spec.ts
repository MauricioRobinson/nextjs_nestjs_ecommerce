import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from './../prisma/prisma.service';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    })
      .useMocker((token) => {
        const results = [
          {
            id: '94322198-0fe0-43a2-a336-4dfcf2f58f14',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@mail.com',
            imageUrl: null,
            createdAt: '2024-04-01T23:35:04.241Z',
            updatedAt: '2024-04-01T23:35:04.241Z',
          },
        ];

        if (token === UsersService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    usersService = await module.resolve(UsersService);
    usersController = await module.resolve(UsersController);
  });

  it('Users controller should be defined', () => {
    expect(usersController).toBeDefined();
  });

  // it('should return an array of users', async () => {
  //   const result = [
  //     {
  //       id: '94322198-0fe0-43a2-a336-4dfcf2f58f14',
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'johndoe@mail.com',
  //       imageUrl: null,
  //       createdAt: '2024-04-01T23:35:04.241Z',
  //       updatedAt: '2024-04-01T23:35:04.241Z',
  //     },
  //   ];

  //   jest.spyOn(usersService, 'findAll').mockResolvedValue(() => result);

  //   expect(await usersController.findAll()).toBe(result);
  // });
});
