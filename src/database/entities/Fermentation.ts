import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Fermentation"})
export class Fermentation {
    @PrimaryColumn()
    fermentation_date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(type => Batch, batch => batch.fermentations)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    sg!:number;

    @Column()
    temperature!:number;

    @Column({length: 100})
    notes!:string;


}