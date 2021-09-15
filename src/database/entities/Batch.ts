import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Wine} from "./Wine";

@Entity({name: "Batch"})
export class Batch {
    @PrimaryGeneratedColumn()
    batch_id!: number;

    @ManyToOne(() => Wine, wine => wine.batchs)
    // @JoinColumn({name: 'wine_id'})
    wine!: Wine;

    @Column({type: "datetime", nullable: false})
    batch_start_date!: Date

    @Column({type: "int"})
    kit_amount!:number;

    @Column({type:"double"})
    brix!:number;

    @Column({type:"double"})
    sg!:number;

    @Column({length:3})
    starting_tank!:string;

    @Column({type:"double"})
    temperature!:number;

    @Column({length: 100})
    notes!:string;
}