import {Request, Response, Application} from "express";
import bcrypt from "bcrypt";
import {Connection} from "typeorm";
import {User} from "../database/entities/User";
import {isAuth} from "../middleware/isAuth";
interface Args {
    app:Application
    connection:Connection
}

export const LoginUser = ({app, connection}:Args):void => {
    // Declare post for the login path
    app.post('/users/login',
        async (req: Request, res: Response) => {
            // Grab all the users from the Database and see if the users loging in exists
            let users = connection.getRepository(User);
            let user = await users.findOne({username: req.body.username});
            // const users = Users.find(users => users.username === req.body.username);
            // If there is no users, send a 400 error
            if (user == null) {
                return res.status(400).send();
            }
            // If the User does exist, check to see if the correct password has been provided.
            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const hashedUser = await bcrypt.hash(user.username, 10);
                    req.session.isAuth = true;
                    req.session.role = user.role;
                    res.status(200).send({hashedUser: hashedUser});
                } else {
                    res.status(403).send("Wrong Password");
                }
            } catch {
                res.status(500).send();
            }
        });
    app.get('/users/login', isAuth, (req, res) => {res.status(200).send()})
}