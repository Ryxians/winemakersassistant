import {Application, Request, Response} from "express";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'
import {Connection} from "typeorm";
import {User} from "../database/entities/User";

interface Args {
    app:Application
    connection:Connection
}

export const CreateUser = ({app, connection}:Args):void => {
    // Create a root users if one isn't already present.
    const initRoot = async () => {
        let count = await connection.getRepository(User).count();

        // If count is 0 then a root users needs to be declared.
        // Username: root
        // Password: root
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

    // Post new users to users
    app.post('/users/new', (async (req: Request, res: Response) => {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            // Create the new User
            let user = new User();
            // Set the new users to the information present.
            user.username = req.body.username;
            user.password = hashedPassword;
            await connection.manager.save(user).then(usr => {
                console.log(usr.username, " has been created!");
                }
            )
            res.status(201).send();
        } catch {
            res.status(500).send();
        }
    }));
}