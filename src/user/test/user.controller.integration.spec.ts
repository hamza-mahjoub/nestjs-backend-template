import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import * as supertest from 'supertest';
import { CreateUserDto } from '../DTO/createUserDto';
import { User, UserSchema } from '../Model/user.entity';
import { UserModule } from '../user.module';

describe('UserController', () => {
  let app: NestExpressApplication;

  const apiClient = () => {
    return supertest(app.getHttpServer());
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get('CONNECTION_STRING'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        UserModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
  });

  afterAll(async () => {
    await app.close();
  });

  test('creates a user', async () => {
    const userCreateDto: CreateUserDto = {
      firstName: 'Hamza',
      name: 'Mahjoub',
      email: 'hamza@gmail.com',
      fullAddress: {
        address: 'Tunis',
        city: 'Tunis',
        country: 'Tunis',
        postalCode: '1234',
      },
      password: 'testtest',
      phoneNumber: '12345678',
      username: 'Hamza-Mahjoub',
    };
    const createdUser = await apiClient()
      .post('/user')
      .send(userCreateDto)
      .expect(201);
    expect(createdUser.body.email).toEqual(userCreateDto.email);
    const users: User[] = (await apiClient().get('/user')).body;
    expect(users.length).toBe(3);
    expect(users[users.length - 1].email).toEqual(userCreateDto.email);
  });

  test('deleteUserById', async () => {
    const users: User[] = (await apiClient().get('/user')).body;
    expect(users.length).toBe(3);
    const deletedUser = await apiClient()
      .delete(`/user/${users[users.length - 1]._id}`)
      .expect(200);
    expect(deletedUser.body).toEqual({ deletedCount: 1 });
  });

  test('getAllUsers', async () => {
    await apiClient().get('/user').expect(200);
    const users: User[] = (await apiClient().get('/user')).body;
    expect(users.length).toEqual(2);
    expect(users[0]._id).toEqual('626c07c021c78dd30f4def89');
    expect(users[1]._id).toEqual('626c07eea92d7fcab7cff01b');
  });

  test('getUser by id', async () => {
    await apiClient().get('/user/626c07c021c78dd30f4def89').expect(200);
    const user: User = (await apiClient().get('/user/626c07c021c78dd30f4def89'))
      .body;
    expect(user._id).toEqual('626c07c021c78dd30f4def89');
    expect(user.email).toEqual('jhon@gmail.com');
  });

  test('getUser by non existing id', async () => {
    await apiClient().get('/user/626c07c021c78dd30f4def87').expect(200);
    const user: User = (await apiClient().get('/user/626c07c021c78dd30f4def65'))
      .body;
    expect(user).toEqual({});
  });

  test('getUser by non valid id', async () => {
    await apiClient().get('/user/azers').expect(412);
  });

  test('updateUserById', async () => {
    let users: User[] = (await apiClient().get('/user')).body;
    expect(users.length).toEqual(2);
    const updatedUser = await apiClient()
      .post(`/user/${users[users.length - 1]._id}`)
      .send({
        fullAddress: {
          address: 'Sousse',
          city: 'Sousse',
          country: 'Tunis',
          postalCode: '8957',
        },
      })
      .expect(201);
    expect(updatedUser.body.fullAddress).toEqual({
      address: 'Sousse',
      city: 'Sousse',
      country: 'Tunis',
      postalCode: '8957',
    });
    expect(updatedUser.body._id).toEqual(users[users.length - 1]._id);
    expect(updatedUser.body.email).toEqual(users[users.length - 1].email);
    users = (await apiClient().get('/user')).body;
    expect(users.length).toBe(2);
  });
});
