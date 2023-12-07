import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  // CREAR USUARIOS
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existeUsuario = await this.usuarioRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
    });

    if (existeUsuario) {
      throw new ConflictException(
        `El usuario ${createUsuarioDto.usuario} ya existe.`,
      );
    }

    const usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.clave = process.env.DEFAULT_PASSWORD;
    usuario.email = createUsuarioDto.email.trim();
    usuario.rol = createUsuarioDto.rol.trim();
    usuario.premium = createUsuarioDto.premium;

    const usuarioDB = await this.usuarioRepository.save(usuario);
    delete usuario.clave;
    return usuarioDB;
  }
  // OBTENER TODOS LOS USUARIOS
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  // OBTENER POR UN id
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return usuario;
  }
  // ACTUALIZAR
  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuarioUpdate);
  }
  // ELIMINAR
  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException(`El usuario ${id} no existe.`);
    }

    return this.usuarioRepository.delete(id);
  }

  async validate(usuario: string, clave: string): Promise<Usuario> {
    const usuarioOk = await this.usuarioRepository.findOne({
      where: { usuario },
      select: ['id', 'usuario', 'clave', 'email', 'rol', 'premium'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    delete usuarioOk.clave;
    return usuarioOk;
  }
}
