import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {Blended_Batch} from "./Blended_Batch";

@Entity({name: "Blend_to_Batch"})
export class Blend_to_Batch {

    @PrimaryColumn()
    blend_id!:number;

    @PrimaryColumn()
    batch_id!:number;


    @ManyToOne(() => Blended_Batch, blend => blend.blend_to_batch, {primary: true})
    @JoinColumn({name: "blend_id"})
    blend!:Blended_Batch;

    @ManyToOne(() => Batch, batch => batch.blend_to_batch, {primary: true})
    @JoinColumn({name:"batch_id"})
    batch!:Batch;

    @Column()
    gallons_used!:number;
}