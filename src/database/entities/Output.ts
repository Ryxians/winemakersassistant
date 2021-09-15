import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Output"})
export class Output {
    @PrimaryColumn()
    output_date!:Date;

    @ManyToOne(type => Batch)
    @JoinColumn({name: "batch_id"})
    batch_id!:number;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column({length: 100})
    notes!:string;
}