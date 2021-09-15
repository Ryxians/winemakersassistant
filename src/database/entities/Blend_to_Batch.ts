import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {Blended_Batch} from "./Blended_Batch";

@Entity({name: "Blend_to_Batch"})
export class Blend_to_Batch {

    @PrimaryColumn()
    @ManyToOne(type => Blended_Batch)
    @JoinColumn({name: "blend_id"})
    blend_id!:number;

    @PrimaryColumn()
    @ManyToOne(type => Batch)
    @JoinColumn({name: "batch_id"})
    batch_id!:number;

    @Column()
    gallons_used!:number;
}