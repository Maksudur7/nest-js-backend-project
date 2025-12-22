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
      await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err: unknown) {
      const e = err as { code?: number };
      console.log(err);
      if (e.code == 11000) {
        throw new ConflictException('Email is alrady taken.');
      }
    }
    return { message: 'User Created !' };
  }
}
