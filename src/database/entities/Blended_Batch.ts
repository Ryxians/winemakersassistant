import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Wine} from "./Wine";
import {Blend_to_Batch} from "./Blend_to_Batch";
import {Blended_Output} from "./Blended_Output";

@Entity({name: "Blended_Batch"})
export class Blended_Batch {

    @PrimaryGeneratedColumn()
    blend_id!:number;

    @Column()
    date!:Date;

    @Column()
    active!:boolean;

    @Column()
    wine_id!:number

    @ManyToOne(() => Wine, wine => wine.blends)
    @JoinColumn({name: 'wine_id'})
    wine!: Wine;

    @Column({length: 100})
    notes:string = "";

    @OneToMany(() => Blend_to_Batch, blends => blends.blend)
    blend_to_batch!: Blend_to_Batch[];

    @OneToMany(() => Blended_Output, out => out.blend)
    blended_output!: Blended_Output[];
}