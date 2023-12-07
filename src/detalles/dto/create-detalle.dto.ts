import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cantidad no debe ser vacio' })
  @IsNumber({}, { message: 'El campo cantidad debe ser de tipo numerico' })
  readonly cantidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio no debe ser vacio' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo numerico' })
  readonly precioUnitario: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio deber ser de tipo numérico' })
  readonly total: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idVenta debe estar definido' })
  @IsNumber({}, { message: 'El campo idVenta debe ser de tipo numérico' })
  readonly idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idProducto debe estar definido' })
  @IsNumber({}, { message: 'El campo idProducto debe ser de tipo numérico' })
  readonly idProducto: number;
}
