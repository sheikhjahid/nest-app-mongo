import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/decorators/serialize.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';

@UseGuards(AuthGuard, AdminGuard)
@Controller('role')
export class RoleController {
  constructor(private service: RoleService) {}
  @Post()
  async create(@Body() body: CreateRoleDto) {
    return await this.service.create(body);
  }

  @Get()
  async list() {
    return await this.service.find();
  }
}
