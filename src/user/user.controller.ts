import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private service: UserService) {}

  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }
}
