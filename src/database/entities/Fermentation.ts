import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Fermentation"})
export class Fermentation {
    @PrimaryColumn()
    fermentation_date!:Date;

    @ManyToOne(type => Batch)
    @JoinColumn({name: 'batch_id'})
    batch_id!:number;

    @Column()
    sg!:number;

    @Column()
    temperature!:number;

    @Column({length: 100})
    notes!:string;
}