import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<any> {
    const { usuario, clave } = authLoginDto;
    const usuarioOk = await this.usuarioService.validate(usuario, clave);

    const payload = { sub: usuarioOk.id };
    const acces_token = await this.getAccessToken(payload);

    return { ...usuarioOk, acces_token };
  }

  async getAccessToken(payload) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION,
    });
    return accessToken;
  }

  async verifyPayload(payload: JwtPayload): Promise<Usuario> {
    let usuario: Usuario;

    try {
      usuario = await this.usuarioService.findOne(payload.sub);
    } catch (error) {
      throw new UnauthorizedException(`Usuario inválido: ${payload.sub}`);
    }
    return usuario;
  }
}
