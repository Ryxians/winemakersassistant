import {Application} from "express";
import {Connection} from "typeorm";
import {User} from "../database/entities/User";

interface Args {
    app:Application
    connection:Connection
}

export const GetUsers = ({app, connection}:Args):void => {
    app.get('/users/get',
        async (req, res) => {
            // req.session.isAuth = true;
            const users = await connection.manager.find(User);

            if (users != undefined) {
                const cleaned = users.map(user => {
                    user.password = '';
                    return user;
                });
                res.statusMessage = "Users Requested";
                res.status(200).send(cleaned)
            } else {
                console.log(users)
                res.status(400).send();
            }
        })
}