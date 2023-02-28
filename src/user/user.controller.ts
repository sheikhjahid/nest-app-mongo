import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { fileFilter, fileName, getCSVFile } from 'src/utils/file-helper';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { DeleteProfileDto } from './dtos/delete-profile.dto';
import { SigninDto } from './dtos/siginin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('users')
  async list() {
    return await this.userService.listUser();
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

  @UseGuards(AuthGuard)
  @Get('signout')
  signout(@Session() session: any) {
    delete session.token;
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: fileName,
      }),
      fileFilter: fileFilter,
    }),
  )
  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() body: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.updateUser(
      id,
      body,
      file?.filename ? `uploads/${file.filename}` : null,
    );
  }

  @UseGuards(AdminGuard)
  @Delete('remove-profile')
  async deleteProfile(@Body() body: DeleteProfileDto) {
    return await this.userService.deleteUser(body);
  }
}
