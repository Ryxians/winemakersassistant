import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {User} from "./User";
import {OutputAbstract} from "./OutputAbstract";

@Entity({name: "Output"})
export class Output extends OutputAbstract{
    @Column()
    batch_id!:number

    @ManyToOne(() => Batch, batch => batch.output)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;
}