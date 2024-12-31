import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class OutputAbstract {
    @PrimaryColumn()
    date!:Date;

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
    user_id!:number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    bottleTeam!:User;
}