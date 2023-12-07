import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}
  // CREAR PRODUCTOS
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const existeProducto = await this.productoRepository.findOneBy({
      codigo: createProductoDto.codigo.trim(),
      idCategoria: createProductoDto.idCategoria,
      idUnidad: createProductoDto.idUnidad,
    });

    if (existeProducto) {
      throw new ConflictException(
        `El producto ${createProductoDto.codigo} ya existe para la categoria.`,
      );
    }

    return this.productoRepository.save({
      idCategoria: createProductoDto.idCategoria,
      codigo: createProductoDto.codigo.trim(),
      descripcion: createProductoDto.descripcion.trim(),
      idUnidad: createProductoDto.idUnidad,
      precio: createProductoDto.precio,
      existenciaProducto: createProductoDto.existenciaProducto,
      urlImagen: createProductoDto.urlImagen.trim(),
    });
  }
  // OBTENER TODOS LOS PRODUCTOS
  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      relations: { categoria: true, unidad: true },
    });
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: { categoria: true, unidad: true },
    });

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }
    return producto;
  }
  // ACTUALIZAR
  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }

    const productoUpdate = Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(productoUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException(`El producto ${id} no existe.`);
    }
    return this.productoRepository.delete(id);
  }
}
