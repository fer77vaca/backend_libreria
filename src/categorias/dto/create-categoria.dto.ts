import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no debe ser vacio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(200, {
    message: 'El campo descripcion no debe ser mayor a 200 caracteres',
  })
  readonly descripcion: string;
}
