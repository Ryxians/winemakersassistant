import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {Wine} from "./Wine";

@Entity({name: "Blended_Batch"})
export class Blended_Batch {

    @PrimaryColumn()
    blend_id!:number;

    @Column()
    blending_date!:Date;

    @ManyToOne(type => Wine)
    @JoinColumn({name: "wine_id"})
    wine_id!:number;

    @Column()
    brix!:number;

    @Column({length: 100})
    notes!:string;
}