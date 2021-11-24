import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Output"})
export class Output {
    @PrimaryColumn()
    date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(() => Batch, batch => batch.output)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column({length: 100})
    notes!:string;
}