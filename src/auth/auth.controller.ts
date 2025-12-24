import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { loginDto } from './dto/loginUserdto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
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

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId)
    console.log(user);
    return {
      ...user,
      password: undefined,
    };
  }
}
