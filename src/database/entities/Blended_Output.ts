import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Blended_Batch} from "./Blended_Batch";

@Entity({name: "Blended_Output"})
export class Blended_Output {

    @PrimaryColumn()
    output_date!:Date;

    @ManyToOne(type => Blended_Batch)
    @JoinColumn({name: "blend_id"})
    blend_id!:number;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column({length:100})
    notes!:string;
}