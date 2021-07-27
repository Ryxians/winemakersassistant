import {Application, Request, Response} from "express";
import bcrypt from 'bcrypt';
import {Users} from '../database/Users'
import {UserInterface} from "../interfaces/UserInterface";
import {v4 as uuid} from 'uuid'

interface Args {
    app:Application
}

export const CreateUser = ({app}:Args):boolean => {

    app.post('/users', (async (req: Request, res: Response) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user:UserInterface = {username: req.body.username, password: hashedPassword, id: uuid()};
            Users.push(user);
            res.status(201).send();
        } catch {
            res.status(500).send();
        }
    }));

    return true;
}