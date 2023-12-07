import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Unidades')
@Controller('unidades')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  create(@Body() createUnidadDto: CreateUnidadDto) {
    return this.unidadesService.create(createUnidadDto);
  }

  @Get()
  findAll() {
    return this.unidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadDto: UpdateUnidadDto) {
    return this.unidadesService.update(+id, updateUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesService.remove(+id);
  }
}
