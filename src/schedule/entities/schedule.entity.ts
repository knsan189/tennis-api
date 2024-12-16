import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity.js";

@Entity("schedule")
export class ScheduleEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "datetime" })
  startTime: Date;

  @Column({ type: "datetime" })
  endTime: Date;

  @Column({ type: "varchar", length: 255 })
  courtName: string;

  @Column({ type: "boolean" })
  dateFixed: boolean;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.id)
  participations: UserEntity[];

  @CreateDateColumn()
  createdAt: Timestamp;
}
