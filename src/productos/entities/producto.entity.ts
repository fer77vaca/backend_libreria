import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Unidad } from 'src/unidades/entities/unidad.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_categoria' })
  idCategoria: number;

  @Column({ length: 10 })
  codigo: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descripcion: string;

  @Column({ name: 'id_unidad' })
  idUnidad: number;

  @Column()
  precio: number;

  @Column({ name: 'existencia_producto' })
  existenciaProducto: number;

  @Column({ name: 'url_imagen', length: 5000 })
  urlImagen: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => Unidad, (unidad) => unidad.productos)
  @JoinColumn({ name: 'id_unidad', referencedColumnName: 'id' })
  unidad: Unidad;

  @OneToMany(() => Detalle, (detalle) => detalle.producto)
  detalles: Detalle[];
}
