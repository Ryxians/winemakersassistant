import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../database/entities/Wine";

interface Args {
    app:Application
    connection:Connection
}

export const wgKit = ({app, connection}:Args):void => {
    // When someone gets to a kit by an id
    app.get('/wine/get/kit/:id',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const wines = connection.manager.getRepository(Wine);

            const {params} = req;

            const wine = await wines.findOne(params.id);

            res.status(wine ? 200 : 400).send(JSON.stringify(wine));
        });

    // get all the kits
    app.get('/wine/get/kit',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const wines = await connection.manager.find(Wine);
            res.status(wines ? 200 : 400).send(JSON.stringify(wines));
        });
}