import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Racking"})
export class Racking {

    @PrimaryColumn()
    racking_date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(type => Batch, batch => batch.fermentation)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    sg!:number;

    @Column()
    temperature!:number;

    @Column()
    sulfite!:number;

    @Column()
    sorbate!:number;

    @Column({length: 4})
    new_tank!:string;

    @Column({length: 200})
    notes!:string;

}
