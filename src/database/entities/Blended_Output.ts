import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Blended_Batch} from "./Blended_Batch";
import {OutputAbstract} from "./OutputAbstract";

@Entity({name: "Blended_Output"})
export class Blended_Output extends OutputAbstract{

    @Column()
    blend_id!:number;

    @ManyToOne(() => Blended_Batch, blend => blend.blended_output)
    @JoinColumn({name: "blend_id"})
    blend!:Blended_Batch;

}