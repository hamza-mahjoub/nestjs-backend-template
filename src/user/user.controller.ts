import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/createUserDto';
import { EditPasswordDto } from './DTO/editPasswordDto';
import { UpdateUserDto } from './DTO/updateUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.userService.createUser(newUser);
  }

  @Get('/')
  async getAllUsers() {
    return await this.userService.getAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id) {
    return await this.userService.get(id);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id) {
    return await this.userService.deleteById(id);
  }

  @Post('/:id')
  async updateUserById(@Param('id') id, @Body() updatedUser: UpdateUserDto) {
    return await this.userService.updateUser(id, updatedUser);
  }

  @Patch('/:id')
  async updateUserPasswordById(
    @Param('id') id,
    @Body() newPassword: EditPasswordDto,
  ) {
    return await this.userService.updatePassword(id, newPassword);
  }
}
