import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { loginDto } from './dto/loginUserdto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }
  @Post('login')
  async login(@Body() loginUserDto: loginDto) {
    console.log('loginUserDto');
    const user = await this.authService.loginUser(loginUserDto);
    return user;
    /**
     * 1. v Recive email and password
     * 2. v Match the email and password with bcript compare
     * 3. v Generate jwt token
     */
  }
}
