import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { SigninDto } from './dtos/siginin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

// @Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('users')
  list() {
    return this.userService.listUser();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@currentUser() user: User) {
    return user;
  }

  @Post('signup')
  async signup(@Body() body: SignUpDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.token = user.token;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.token = user.token;
    return user;
  }

  @Get('signout')
  signout(@Session() session: any) {
    delete session.token;
  }

  @Put('profile/:id')
  async updateProfile(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return await this.userService.updateUser(id, body);
  }
}
