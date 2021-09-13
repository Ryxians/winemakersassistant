import {Application, Request, Response} from "express";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'
import {Connection} from "typeorm";
import {User} from "../database/entities/User";

interface Args {
    app:Application
    connection:Connection | undefined
}

export const CreateUser = ({app, connection}:Args):void => {
    if (!connection) {
        console.log("No Database, Cannot implement User Creation");
        return;
    }
    const initRoot = async () => {
        let count = await connection.getRepository(User).count();
        if (count === 0) {
            let root = new User();
            root.username = 'root';
            root.password = await bcrypt.hash('root', 10);
            await connection.manager.save(root).then(rt => {
                console.log("Root Created with default login (root/root). " +
                    "\nCHANGE IMMEDIATELY!")
            })
        }
    }
    initRoot();
    app.post('/users', (async (req: Request, res: Response) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let user = new User();
            user.username = req.body.username;
            user.password = hashedPassword;
            await connection.manager.save(user).then(usr => {
                console.log(usr.username, " has been created!");
                }
            )
            // const user:UserInterface = {username: req.body.username, password: hashedPassword, id: uuid()};
            // Users.push(user);
            res.status(201).send();
        } catch {
            res.status(500).send();
        }
    }));
}