import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard, AdminGuard)
@Controller('permission')
export class PermissionController {
  constructor(private service: PermissionService) {}
  @Post()
  async store(@Body() body: CreatePermissionDto) {
    return await this.service.create(body);
  }

  @Get()
  async list() {
    return await this.service.list();
  }
}
