import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "Users"})
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column(
        {
            length: 10
        }
    )
    username!: string;

    @Column(
        {
            length: 72
        }
    )
    password!: string;
}