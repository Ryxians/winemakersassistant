import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../database/entities/Wine";
import {isAuth} from "../../middleware/isAuth";

interface Args {
    app:Application
    connection:Connection
}

export const WaKit = ({app, connection}:Args):void => {
    // When someone posts to the path
    app.post('/wine/add/kit', isAuth,
        async (req, res, next) => {
            // Declare the new wine object and get the details from the request
            const wine = await connection.manager.create(Wine, req.body);
            if (!req.body.wine_style) {
                res.status(403).send("No Style Provided.");
                return;
            }

            if (!req.body.fancy_name) {
                res.status(403).send("No Name Provided.");
                return;
            }

            if (!req.body.kit_volume) {
                res.status(403).send("No Kit Volume Provided");
                return;
            }

            await connection.manager.save(wine).then(wine => {
                res.statusMessage = "Wine: " + wine + " has been created!";
                res.status(201).send(wine);
                next();
            });
        });
}