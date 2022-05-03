/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { assert } from 'console';
import { Model } from 'mongoose';
import { CreateUserDto } from '../DTO/createUserDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { User } from '../Model/user.entity';
import { UserService } from '../user.service';
import { MongooseUserApi } from './__mocks__/mongoose-user-api';
import { userStub, USER_STUB_EMAIL, USER_STUB_ID } from './__mocks__/user.stub';

describe('UserService', () => {
  let service: UserService;
  let mockUserModel: Model<User>;
  beforeEach(async () => {
    const MongooseApiServiceProvider = {
      provide: getModelToken(User.name),
      useClass: MongooseUserApi,
      // useFactory: () => ({
      //   find: () => {
      //     return { exec: jest.fn(() => {}) };
      //   },
      //   findOne: () => {
      //     return { exec: jest.fn(() => {}) };
      //   },
      //   findAll: () => {
      //     return { exec: jest.fn(() => {}) };
      //   },
      //   create: jest.fn(() => {}),
      //   findByIdAndUpdate: () => {
      //     return { exec: jest.fn(() => {}) };
      //   },
      // }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot({
        //   isGlobal: true,
        // }),
        // MongooseModule.forRootAsync({
        //   imports: [ConfigModule],
        //   useFactory: (configService: ConfigService) => ({
        //     uri: configService.get('CONNECTION_STRING'),
        //   }),
        //   inject: [ConfigService],
        // }),
        // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      // controllers: [UserController],
      providers: [UserService, MongooseApiServiceProvider],
    }).compile();

    service = module.get<UserService>(UserService);
    mockUserModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call the create method in the model', () => {
    expect(service.create).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let createUserDto: CreateUserDto;
      let createExistingUserDto: CreateUserDto;
      let createFaultUserDto: CreateUserDto; // return null on creation
      beforeEach(async () => {
        createUserDto = userStub(
          '626c07c021c78dd30f4deaab',
          'FlenaFeltena@gmail.com',
        );
        createExistingUserDto = userStub(USER_STUB_ID, USER_STUB_EMAIL);
        createFaultUserDto = userStub(USER_STUB_ID, 'fault@gmail.com');
      });

      test('then it should throw an exception if user exists', () => {
        expect(async () => {
          await service.createUser(createExistingUserDto);
        }).rejects.toThrow(HttpException);
      });

      test('then it should throw an exception if creation is faulty', async () => {
        try {
          await service.createUser(createFaultUserDto);
        } catch (error) {
          assert('Something went wrong !' == error.response);
          assert(417 == error.status);
        }
      });

      test('then it should return created User', async () => {
        const user = await service.createUser(createUserDto);
        const expectedUser = userStub(
          '626c07c021c78dd30f4deaab',
          'FlenaFeltena@gmail.com',
        );
        expect({ ...expectedUser, password: undefined }).toEqual({
          ...user,
          password: undefined,
        });
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let updateUserDto: UpdateUserDto;
      let updateUnexistingUserDto: UpdateUserDto;
      let updateExistingEmailDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = userStub(USER_STUB_ID, USER_STUB_EMAIL);
        updateUnexistingUserDto = userStub(
          '626c07c021c78dd30f4deabb',
          USER_STUB_EMAIL,
        );
        updateExistingEmailDto = userStub(USER_STUB_ID, 'FlenFelten@gmail.com');
      });

      test('then it should throw an exception if user does not exists', async () => {
        try {
          await service.updateUser(
            '626c07c021c78dd30f4deabb',
            updateUnexistingUserDto,
          );
        } catch (error) {
          expect(error.response).toEqual('User not found!');
          expect(error.status).toEqual(412);
        }
      });

      test('then it should throw an exception if updated user email already exists', async () => {
        try {
          await service.updateUser(USER_STUB_ID, updateExistingEmailDto);
        } catch (error) {
          expect(error).toEqual({
            response: 'Email already in use!',
            status: 412,
          });
        }
      });

      test('then it should return updated user if everything ok', async () => {
        const user = await service.updateUser(USER_STUB_ID, updateUserDto);
        expect(user).toEqual(userStub(USER_STUB_ID, USER_STUB_EMAIL));
      });
    });
  });
});
