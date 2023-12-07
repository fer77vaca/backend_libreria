import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo codigo no debe ser vacio' })
  @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo codigo no debe ser mayor a 10 caracteres',
  })
  readonly codigo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo descripcion no debe ser mayor a 100 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo idUnidad debe estar definido' })
  @IsNumber({}, { message: 'El campo idUnidad debe ser de tipo numérico' })
  readonly idUnidad: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo precio no debe ser vacío' })
  @IsNumber({}, { message: 'El campo precio deber ser de tipo numérico' })
  readonly precio: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo existenciaProducto no debe ser vacío' })
  @IsNumber(
    {},
    { message: 'El campo existenciaProducto deber ser de tipo numérico' },
  )
  readonly existenciaProducto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo imagen no debe ser vacío' })
  @IsString({ message: 'El campo imagen debe ser de tipo cadena' })
  @MaxLength(5000, {
    message: 'El campo imagen no debe ser mayor a 5000 caracteres',
  })
  readonly urlImagen: string;
}
