import { Body, Controller, Post, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const exist = await this.usersService.existUsername(user.username);
    if (exist) {
      throw new BadRequestException('El nombre de usuario ya existe');
    }

    return await this.usersService.create(user);
  }
}
