import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findOne(username: string) {
    return await this.userModel.findOne({ username: username.toLowerCase() });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async existUsername(username: string) {
    const existUser = await this.userModel.findOne({
      username: username.toLowerCase(),
    });
    return existUser ? true : false;
  }

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);

    /**
     * @INFO Encriptar contraseña antes de guardar
     */
    const salt = bcrypt.genSaltSync();
    createdUser.password = bcrypt.hashSync(user.password, salt);
    createdUser.username = user.username.toLowerCase();

    const token = await this.authService.login({
      username: createdUser.username,
      uid: createdUser.id,
    });

    await createdUser.save();

    return {
      user: createdUser,
      token: token.token,
    };
  }
}
