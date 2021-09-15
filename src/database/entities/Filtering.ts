import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Filtering"})
export class Filtering {

    @PrimaryColumn()
    filtering_date!:Date;

    @ManyToOne(type => Batch)
    @JoinColumn({name: "batch_id"})
    batch_id!:number;

    @Column()
    sg!:number;

    @Column({length: 4})
    new_tank!:string;

    @Column({length: 100})
    notes!:string;
}