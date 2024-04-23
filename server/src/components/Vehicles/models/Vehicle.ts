import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "vehicles", synchronize: false, schema: "public" })
export class Vehicle {
  @PrimaryColumn()
  id!: number;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column()
  state!: string;
}
