import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}
  // CREAR
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const existeVenta = await this.ventaRepository.findOneBy({
      idUsuario: createVentaDto.idUsuario,
      idCliente: createVentaDto.idCliente,
      transaccion: createVentaDto.transaccion.trim(),
    });

    if (existeVenta) {
      throw new ConflictException(
        `La venta ${createVentaDto.transaccion} ya existe.`,
      );
    }

    return this.ventaRepository.save({
      transaccion: createVentaDto.transaccion.trim(),
      fecha: createVentaDto.fecha,
      idUsuario: createVentaDto.idUsuario,
      idCliente: createVentaDto.idCliente,
    });
  }
  // OBTENER TODAS LAS VENTAS
  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({
      relations: { usuario: true, cliente: true },
    });
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: { usuario: true, cliente: true },
    });

    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    return venta;
  }
  // ACTUALIZAR
  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventaRepository.findOneBy({ id });

    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    const ventaUpdate = Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(ventaUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const venta = await this.ventaRepository.findOneBy({ id });

    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe.`);
    }

    return this.ventaRepository.delete(id);
  }
}
