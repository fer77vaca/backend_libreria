import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnidadesService {
  constructor(
    @InjectRepository(Unidad)
    private unidadRepository: Repository<Unidad>,
  ) {}
  // CREAR
  async create(createUnidadDto: CreateUnidadDto): Promise<Unidad> {
    const existe = await this.unidadRepository.findOneBy({
      descripcion: createUnidadDto.descripcion.trim(),
    });

    if (existe) {
      throw new ConflictException(
        `La unidad ${createUnidadDto.descripcion} ya existe.`,
      );
    }

    return this.unidadRepository.save({
      descripcion: createUnidadDto.descripcion.trim(),
    });
  }
  // OBTENER TODOS
  async findAll(): Promise<Unidad[]> {
    return this.unidadRepository.find();
  }
  // OBTENER POR id
  async findOne(id: number): Promise<Unidad> {
    const unidad = await this.unidadRepository.findOneBy({ id });

    if (!unidad) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }
    return unidad;
  }
  // ACTUALIZAR
  async update(id: number, updateUnidadDto: UpdateUnidadDto): Promise<Unidad> {
    const unidad = await this.unidadRepository.findOneBy({ id });

    if (!unidad) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }
    const unidadUpdate = Object.assign(unidad, updateUnidadDto);
    return this.unidadRepository.save(unidadUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const existe = await this.unidadRepository.findOneBy({ id });

    if (!existe) {
      throw new NotFoundException(`La unidad ${id} no existe.`);
    }

    return this.unidadRepository.delete(id);
  }
}
