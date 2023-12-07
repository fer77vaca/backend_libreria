import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}
  // CREAR -->> nombre marca descripcion
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const existeCategoria = await this.categoriaRepository.findOneBy({
      descripcion: createCategoriaDto.descripcion.trim(),
    });

    if (existeCategoria) {
      throw new ConflictException(
        `La categoria ${createCategoriaDto.descripcion} ya existe.`,
      );
    }

    return this.categoriaRepository.save({
      descripcion: createCategoriaDto.descripcion.trim(),
    });
  }
  // OBTENER TODAS LAS CATEGORIA
  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }
  // OBTENER CATEGORIA POR UN ID
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    return categoria;
  }
  // ACTUALIZAR
  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    const categoriaUpdate = Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoriaUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({ id });

    if (!categoria) {
      throw new NotFoundException(`La categoria ${id} no existe.`);
    }

    return this.categoriaRepository.delete(id);
  }
}
