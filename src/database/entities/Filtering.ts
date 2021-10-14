import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Filtering"})
export class Filtering {

    @PrimaryColumn()
    date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(type => Batch, batch => batch.filterings)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    sg!:number;

    @Column({length: 4})
    new_tank!:string;

    @Column({length: 100})
    notes!:string;
}