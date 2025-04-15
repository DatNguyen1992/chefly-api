import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service';
import { GetUser } from '@common/decorators/get-user.decorator';
import { CreateHistoryDto } from './dto/create-history.dto';
import { QueryHistoryDto } from './dto/query-history.dto';

@ApiTags('history')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create history' })
  create(
    @GetUser('_id') id: string,
    @Body() createHistoryDto: CreateHistoryDto,
  ) {
    return this.historyService.createHistory(id, createHistoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list history' })
  getList(@GetUser('_id') id: string, @Query() query: QueryHistoryDto) {
    return this.historyService.findHistoryPage(id, query);
  }

  @Delete('all')
  @ApiOperation({ summary: 'Delete all history' })
  deleteAll(@GetUser('_id') userId: string) {
    return this.historyService.removeAll(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete current history' })
  delete(@Param('id') id: string, @GetUser('_id') userId: string) {
    return this.historyService.remove(id, userId);
  }
}
