import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../DTO/createUserDto';
import { EditPasswordDto } from '../DTO/editPasswordDto';
import { UpdateUserDto } from '../DTO/updateUserDto';
import { User } from '../Model/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { USER_STUB_ID, USER_STUB_EMAIL, userStub } from './__mocks__/user.stub';

jest.mock('../user.service');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        createUser: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
        getAll: jest
          .fn()
          .mockResolvedValue([userStub(USER_STUB_ID, USER_STUB_EMAIL)]),
        get: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
        deleteById: jest.fn().mockResolvedValue({ deletedCount: 1 }),
        update: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, 'FlenBenFelten')),
        updatePassword: jest
          .fn()
          .mockResolvedValue(userStub(USER_STUB_ID, USER_STUB_EMAIL)),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {
        createUserDto = userStub(USER_STUB_ID, USER_STUB_EMAIL);
        user = await controller.createUser(createUserDto);
      });

      test('then it should call user Service', () => {
        expect(service.createUser).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub(USER_STUB_ID, USER_STUB_EMAIL));
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await controller.getAllUsers();
      });

      test('then it should call userService', () => {
        expect(service.getAll).toBeCalledWith();
      });

      test('then is should return a list of users', () => {
        expect(users).toEqual([userStub(USER_STUB_ID, USER_STUB_EMAIL)]);
      });
    });
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await controller.getUser(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
        );
      });

      test('then it should call userService', () => {
        expect(service.get).toBeCalledWith(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
        );
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userStub(USER_STUB_ID, USER_STUB_EMAIL));
      });
    });
  });

  describe('deleteUserById', () => {
    describe('when deleteUserById is called', () => {
      let deleteObj;
      beforeEach(async () => {
        deleteObj = await controller.deleteUserById(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
        );
      });

      test('then it should call userService', () => {
        expect(service.deleteById).toBeCalledWith(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
        );
      });

      test('then is should return a user', () => {
        expect(deleteObj).toEqual({ deletedCount: 1 });
      });
    });
  });

  describe('updateUserById', () => {
    describe('when updateUserById is called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          email: userStub(USER_STUB_ID, USER_STUB_EMAIL).email,
          name: userStub(USER_STUB_ID, 'FlenBenFelten').name,
          firstName: userStub(USER_STUB_ID, 'FlenBenFelten').firstName,
          username: userStub(USER_STUB_ID, USER_STUB_EMAIL).username,
          fullAddress: userStub(USER_STUB_ID, USER_STUB_EMAIL).fullAddress,
          phoneNumber: userStub(USER_STUB_ID, USER_STUB_EMAIL).phoneNumber,
        };
        user = await controller.updateUserById(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
          updateUserDto,
        );
      });

      test('then it should call userService', () => {
        expect(service.updateUser).toBeCalledWith(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
          updateUserDto,
        );
      });

      test('then is should return an updated user', () => {
        expect(user).toEqual(userStub(USER_STUB_ID, 'FlenBenFelten'));
      });
    });
  });

  describe('updateUserPasswordById', () => {
    describe('when updateUserPasswordById is called', () => {
      let user: User;
      let updatePassword: EditPasswordDto;

      beforeEach(async () => {
        updatePassword = {
          oldPassword: userStub(USER_STUB_ID, USER_STUB_EMAIL).password,
          newPassword: '12345678',
        };
        user = await controller.updateUserPasswordById(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
          updatePassword,
        );
      });

      test('then it should call userService', () => {
        expect(service.updatePassword).toBeCalledWith(
          userStub(USER_STUB_ID, USER_STUB_EMAIL)._id,
          updatePassword,
        );
      });

      test('then is should return an updated password user', () => {
        expect(user).toEqual(userStub(USER_STUB_ID, USER_STUB_EMAIL));
      });
    });
  });
});
