import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Output"})
export class Output {
    @PrimaryColumn()
    output_date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(type => Batch, batch => batch.outputs)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column({length: 100})
    notes!:string;
}