import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CrudService } from '../shared/crud.service';
import { CreateUserDto } from './DTO/createUserDto';
import { User } from './Model/user.entity';
import { UpdateUserDto } from './DTO/updateUserDto';
import { EditPasswordDto } from './DTO/editPasswordDto';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectModel('User')
    private readonly model: Model<User>,
  ) {
    super(model);
  }

  async createUser(newUser: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUser.password, salt);
    const existingUser = await this.model.findOne({ email: newUser.email });
    if (existingUser)
      throw new HttpException(
        'User already exists!',
        HttpStatus.PRECONDITION_FAILED,
      );
    return this.create({ ...newUser, password: hashedPassword });
  }

  async updateUser(id, updateUser: UpdateUserDto) {
    const existingUser = await this.get(id);
    if (existingUser) {
      if (updateUser.email !== undefined) {
        const existingEmailUser = await this.findOne('email', updateUser.email);
        if (existingEmailUser)
          throw new HttpException(
            'Email already in use!',
            HttpStatus.PRECONDITION_FAILED,
          );
      }
      return this.updateById(id, updateUser);
    } else
      throw new HttpException(
        'User not found!',
        HttpStatus.PRECONDITION_FAILED,
      );
  }

  async updatePassword(id, updatePassword: EditPasswordDto) {
    const existingUser = await this.get(id);
    if (existingUser) {
      const { oldPassword, newPassword } = updatePassword;
      if (bcrypt.compareSync(oldPassword, existingUser.password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        return this.updateById(id, { password: hashedPassword });
      }
      throw new HttpException(
        'Wrong password !',
        HttpStatus.PRECONDITION_FAILED,
      );
    } else
      throw new HttpException(
        'User not found!',
        HttpStatus.PRECONDITION_FAILED,
      );
  }
}
