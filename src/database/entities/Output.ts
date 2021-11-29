import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Batch} from "./Batch";
import {User} from "./User";

@Entity({name: "Output"})
export class Output {
    @PrimaryColumn()
    date!:Date;

    @Column()
    batch_id!:number

    @ManyToOne(() => Batch, batch => batch.output)
    @JoinColumn({name: "batch_id"})
    batch!:Batch;

    @Column()
    numberOfContainer!:number;

    @Column()
    containerSize!:number;

    @Column()
    fillLevel:number = 0;

    @Column()
    fillLevelTwo:number = 0;

    @Column({length: 100})
    notes!:string;

    @Column()
    user_id!:number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    bottleTeam!:User
}