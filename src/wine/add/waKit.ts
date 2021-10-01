import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../database/entities/Wine";

interface Args {
    app:Application
    connection:Connection
}

export const WaKit = ({app, connection}:Args):void => {
    // When someone posts to the path
    app.post('/wine/add/kit',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const wine = new Wine();
            if (req.body.style) {
                wine.wine_style = req.body.style;
            } else {
                res.status(403).send("No Style Provided.");
                return;
            }

            if (req.body.name) {
                wine.fancy_name = req.body.name;
            } else {
                res.status(403).send("No Name Provided.");
                return;
            }

            await connection.manager.save(wine).then(wine => {
                console.log("Wine: ", wine, " has been created!");
            });
        });
}