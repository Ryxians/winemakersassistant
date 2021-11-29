import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Wine} from "./Wine";
import {Fermentation} from "./Fermentation";
import {Racking} from "./Racking";
import {Filtering} from "./Filtering";
import {Output} from "./Output";
import {Blend_to_Batch} from "./Blend_to_Batch";

@Entity({name: "Batch"})
export class Batch {
    @PrimaryGeneratedColumn()
    batch_id!: number;

    @Column()
    wine_id!:number

    @ManyToOne(() => Wine, wine => wine.batchs)
    @JoinColumn({name: 'wine_id'})
    wine!: Wine;

    @Column()
    active!:boolean;

    @Column({type: "datetime", nullable: false})
    start_date!: Date;

    @Column({type: "int"})
    kit_amount!:number;

    @Column({type:"double"})
    brix!:number;

    @Column()
    volume!:number;

    @Column({type:"double"})
    sg!:number;

    @Column({length:3})
    starting_tank!:string;

    @Column({type:"double"})
    temperature!:number;

    @Column({length: 100})
    notes!:string;

    @Column({length:3})
    last_tank!:string;

    @OneToMany(() => Fermentation, ferm => ferm.batch)
    fermentation!: Fermentation[];

    @OneToMany(() => Racking, rack => rack.batch)
    racking!: Racking[];

    @OneToMany(() => Filtering, filter => filter.batch)
    filtering!: Filtering[];

    @OneToMany(() => Output, out => out.batch)
    output!: Output[];

    @OneToMany(() => Blend_to_Batch, blends => blends.batch)
    blend_to_batch!: Blend_to_Batch[];
}