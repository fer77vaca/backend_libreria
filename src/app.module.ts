import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/entities/producto.entity';
import { VentasModule } from './ventas/ventas.module';
import { Venta } from './ventas/entities/venta.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriasModule } from './categorias/categorias.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { DetallesModule } from './detalles/detalles.module';
import { Detalle } from './detalles/entities/detalle.entity';
import { ClientesModule } from './clientes/clientes.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UnidadesModule } from './unidades/unidades.module';
import { Unidad } from './unidades/entities/unidad.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Producto, Venta, Categoria, Detalle, Cliente, Usuario, Unidad],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductosModule,
    VentasModule,
    CategoriasModule,
    DetallesModule,
    ClientesModule,
    UsuariosModule,
    UnidadesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
