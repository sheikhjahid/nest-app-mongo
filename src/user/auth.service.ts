import { BadRequestException, Injectable } from '@nestjs/common';
import { SigninDto } from './dtos/siginin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET_KEY';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(body: SignUpDto) {
    const user = await this.userService.findUser({ email: body.email });
    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const password = await bcrypt.hash(body.password, 10);

    const token = await this.generateToken(body.email);

    const newUser = await this.userService.create({
      ...body,
      password: password,
    });

    return {
      email: newUser.email,
      token,
    };
  }

  async signin(body: SigninDto) {
    const user = await this.userService.findUser({ email: body.email });

    let checkPassword = false;
    if (user) {
      checkPassword = await bcrypt.compare(body.password, user.password);
    }

    if (!user || checkPassword === false) {
      throw new BadRequestException('Invalid Credentials');
    }

    const token = await this.generateToken(body.email);

    return {
      email: user.email,
      token,
    };
  }

  async generateToken(email: string) {
    return await jwt.sign({ email: email }, JWT_SECRET);
  }
}
