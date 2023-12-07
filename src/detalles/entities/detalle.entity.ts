 import { Producto } from 'src/productos/entities/producto.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('detalles')
export class Detalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'int' })
  precioUnitario: number;

  @Column()
  total: number;

  @Column({ name: 'id_venta' })
  idVenta: number;

  @Column({ name: 'id_producto' })
  idProducto: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ManyToOne(() => Venta, (venta) => venta.detalles)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;

  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
