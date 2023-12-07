import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUnidadDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo unidad no debe ser vacío' })
  @IsString({ message: 'El campo unidad debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo unidad no debe ser mayor a 30 caracteres',
  })
  readonly descripcion: string;
}
