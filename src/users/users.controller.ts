import {
  Controller,
  Get,
  Patch,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@GetUser() user: User) {
    return user;
  }
  @Get('all')
  @ApiOperation({ summary: 'Get current user profile' })
  getAll() {
    return this.usersService.findAllUser();
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  update(@GetUser('_id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Delete current user account' })
  remove(@GetUser('_id') id: string) {
    return this.usersService.remove(id);
  }
}
