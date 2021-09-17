import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Blended_Batch} from "./Blended_Batch";

@Entity({name: "Blended_Output"})
export class Blended_Output {

    @PrimaryColumn()
    output_date!:Date;

    @Column()
    blend_id!:number;

    @ManyToOne(type => Blended_Batch, blend => blend.blended_output)
    @JoinColumn({name: "blend_id"})
    blend!:Blended_Batch;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column({length:100})
    notes!:string;
}