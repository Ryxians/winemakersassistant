import {Application} from "express";
import {Connection} from "typeorm";

interface Args {
    app:Application
    connection:Connection
}

export const LogoutUser = ({app, connection}:Args):void => {
    app.post('/users/logout', (req, res) => {
        req.session.isAuth = false;
        req.session.destroy(() => res.send());
    });
}