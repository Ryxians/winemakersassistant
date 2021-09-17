import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {Wine} from "./Wine";
import {Blend_to_Batch} from "./Blend_to_Batch";
import {Blended_Output} from "./Blended_Output";

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

    @OneToMany(() => Blend_to_Batch, blends => blends.blend)
    blend_to_batch!: Blend_to_Batch[];

    @OneToMany(() => Blended_Output, out => out.blend)
    blended_output!: Blended_Output[];
}