import { PartialType } from '@nestjs/swagger';
import { CreateDetalleDto } from './create-detalle.dto';

export class UpdateDetalleDto extends PartialType(CreateDetalleDto) {}
