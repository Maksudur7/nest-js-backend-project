import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerUser.dto';
import bcript from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async registerUser(registerUserDto: RegisterDto) {
    console.log('regster dto', registerUserDto);

    const saltRounds = 10;
    const has = await bcript.hash(registerUserDto.password, saltRounds);
    // logic for user register
    /**
     * 1. check if email alrady exists
     * 2. has the password
     * 3. generate jwe token
     * 5. send token in response
     */
    const result = await this.userService.createUser({...registerUserDto, password : has,});
    return result;
  }
}
