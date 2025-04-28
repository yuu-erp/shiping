import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getAll')
  findAll() {
    return this.usersService.getAllUser();
  }

  @Get('getUserByID/:id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Post('createUser')
  createUser(@Body() userBody: { email: string; password: string }) {
    return this.usersService.createUser(userBody);
  }

  @Post('update')
  updateUser(
    @Body() userBody: { email: string; password: string; id: number },
  ) {
    return this.usersService.updateUser(userBody);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.sub; // req.user đã được JwtStrategy gắn vào
    return this.usersService.getUserById(userId);
  }
}
