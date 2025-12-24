import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(registerUserDto: RegisterDto) {
    try {
      const newUser = await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
      return newUser;
    } catch (err: unknown) {
      const e = err as { code?: number };
      console.log(err);
      if (e.code == 11000) {
        throw new ConflictException('Email is already taken.');
      }
      throw err;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const matchUser = await this.userModel.findOne({
        email: email
      });
      return matchUser;
    } catch (err: unknown) {
      throw err;
    }
  }

  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }
}