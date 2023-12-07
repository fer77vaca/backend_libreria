import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDetalleDto } from './dto/create-detalle.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(Detalle)
    private detalleRepository: Repository<Detalle>,
  ) {}
  // CREAR
  async create(createDetalleDto: CreateDetalleDto): Promise<Detalle> {
    const existeDetalle = await this.detalleRepository.findOneBy({
      idVenta: createDetalleDto.idVenta,
      idProducto: createDetalleDto.idProducto,
      total: createDetalleDto.total,
    });

    if (existeDetalle) {
      throw new ConflictException(
        `El detalle ${createDetalleDto.total} ya existe`,
      );
    }

    return this.detalleRepository.save({
      idVenta: createDetalleDto.idVenta,
      idProducto: createDetalleDto.idProducto,
      cantidad: createDetalleDto.cantidad,
      precioUnitario: createDetalleDto.precioUnitario,
      total: createDetalleDto.total,
    });
  }
  // OBTENER TODOS LOS DETALLES
  async findAll(): Promise<Detalle[]> {
    return this.detalleRepository.find({
      relations: { venta: true, producto: true },
    });
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });

    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }
    return detalle;
  }
  // ACTUALIZAR
  async update(
    id: number,
    updateDetalleDto: UpdateDetalleDto,
  ): Promise<Detalle> {
    const detalle = await this.detalleRepository.findOneBy({ id });

    if (!detalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    const detalleUpdate = Object.assign(detalle, updateDetalleDto);
    return this.detalleRepository.save(detalleUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const existeDetalle = await this.detalleRepository.findOneBy({ id });

    if (!existeDetalle) {
      throw new NotFoundException(`El detalle ${id} no existe.`);
    }

    return this.detalleRepository.delete(id);
  }
}
