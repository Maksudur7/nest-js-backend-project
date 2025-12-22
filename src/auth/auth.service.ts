import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  registerUser(registerUserDto: RegisterDto) {
    console.log('regster dto', registerUserDto);
    // logic for user register
    /**
     * 1. check if email alrady exists
     * 2. has the password
     * 3. generate jwe token
     * 5. send token in response
     */
    const result = this.userService.createUser();
    return result;
  }
}
