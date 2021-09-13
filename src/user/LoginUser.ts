import {Request, Response, Application} from "express";
import bcrypt from "bcrypt";
import {Connection} from "typeorm";
import {User} from "../database/entities/User";
interface Args {
    app:Application
    connection:Connection
}

export const LoginUser = ({app, connection}:Args):void => {
    if (!connection) {
        console.log("No Database, Cannot implement User Login");
    }
    app.post('/login',
        async (req: Request, res: Response) => {
            let users = connection.getRepository(User);
            let user = await users.findOne({username: req.body.username});
            // const user = Users.find(user => user.username === req.body.username);
            console.log(req.body)
            if (user == null) {
                return res.status(400).send();
            }
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const hashedUser = await bcrypt.hash(user.username, 10);
                    res.status(200).send({hashedUser: hashedUser});
                } else {
                    res.status(403).send("Wrong Password");
                }
            } catch {
                res.status(500).send();
            }
        });
}