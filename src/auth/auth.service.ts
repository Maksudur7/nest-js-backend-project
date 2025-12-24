import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerUser.dto';
import bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/loginUserdto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async registerUser(registerUserDto: RegisterDto) {
    console.log('regster dto', registerUserDto);

    const saltRounds = 10;
    const has = await bcript.hash(registerUserDto.password, saltRounds);

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: has,
    });

    //todo : remove role admin from here . only for test.

    const paylod = { sub: user._id.toString(), role: 'admin' };
    const token = await this.jwtService.signAsync(paylod);
    return { Access_token: token };
  }

  async loginUser(loginUserDto: loginDto) {
    console.log(loginUserDto);
    const user = await this.userService.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new Error('User not found');
    }

    const compareUser = await bcript.compare(
      loginUserDto.password,
      user.password,
    );
    if (!compareUser) {
      throw new Error('Invalid password');
    }

    const payload = { sub: user._id.toString() };
    const token = await this.jwtService.signAsync(payload);
    console.log('find token', token);
    return { Access_token: token };
  }
}