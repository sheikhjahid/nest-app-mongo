import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/siginin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get('users')
  list() {
    return this.userService.listUser();
  }

  @Post('signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }
}
