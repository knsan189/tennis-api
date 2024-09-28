import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn()
  createdAt: Timestamp;
}
