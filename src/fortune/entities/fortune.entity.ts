import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("fortune")
export class FortuneEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  fortune: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  postscript: string;

  @Column({ type: "int", default: 1000 })
  postscriptDelayTime: number;
}
