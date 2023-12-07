import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVentaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo transaccion no debe ser vacío' })
  @IsString({ message: 'El campo transaccion debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo transaccion no debe ser mayor a 20 caracteres',
  })
  readonly transaccion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fecha debe estar definido' })
  @IsDateString({}, { message: 'El campo fecha debe ser de tipo fecha' })
  readonly fecha: Date;

  @ApiProperty()
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsNumber({}, { message: 'El campo idUsuario debe ser de tipo numerico' })
  readonly idUsuario: number;

  @ApiProperty()
  @IsDefined({ message: 'El campo idCliente debe estar definido' })
  @IsNumber({}, { message: 'El campo idCliente debe ser de tipo numerico' })
  readonly idCliente: number;
}
