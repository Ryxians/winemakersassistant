import {Request, Response, Application} from "express";
import bcrypt from "bcrypt";
import {Users} from '../database/Users'
interface Args {
    app:Application
}

export const LoginUser = ({app}:Args):void => {
    app.post('/login',
        async (req: Request, res: Response) => {
            const user = Users.find(user => user.username === req.body.username);
            console.log(req.body)
            if (user == null) {
                return res.status(400).send();
            }
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    res.status(200).send("Success");
                }
            } catch {
                res.status(500).send();
            }
        });
}