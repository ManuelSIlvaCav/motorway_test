import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Vehicle } from "../../Vehicles/models/Vehicle";

@Entity({ name: "stateLogs", synchronize: false, schema: "public" })
export class StateLog {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: "uuid", insert: false, select: false, update: false })
  id?: never;

  @OneToOne((type) => Vehicle)
  @JoinColumn()
  vehicle?: Vehicle;

  @Column()
  state?: string;

  @Column({ type: "timestamptz" })
  timestamp?: Date;
}
