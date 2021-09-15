import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Batch} from "./Batch";

@Entity({name: "Wine"})
export class Wine {
    @PrimaryGeneratedColumn()
    wine_id!: number;

    @Column({
        length: 50
    })
    fancy_name!: string;

    @Column({
        length:50
    })
    wine_style!: string;

    @OneToMany(() => Batch, batch => batch.wine)
    batchs!: Batch[]
}