import {Application} from "express";
import {Connection} from "typeorm";
import {isAdmin} from "../middleware/isAuth";
import {User} from "../database/entities/User";
import bcrypt from "bcrypt";

interface Args {
    app: Application
    connection: Connection
}

export const UpdateUser = ({app, connection}: Args): void => {
    app.put('/users/put/:id', isAdmin,
        async (req, res) => {
            const userRepository = connection.getRepository(User);
            const user = await userRepository.findOne(req.params.id);
            if (user) {
                let { password } = req.body;
                if (password !== "" || !password) {
                    password = await bcrypt.hash(password, 10);
                } else {
                    password = user.password;
                }
                req.body.password = password;
                userRepository.merge(user, req.body);
                const results = await userRepository.save(user);
                return res.status(200).send(results);
            } else {
                res.status(400).send();
            }
        });
}