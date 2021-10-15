import {Application} from "express";
import {Connection, EntityTarget} from "typeorm";

interface Args {
    app:Application
    connection:Connection
}

export function CreateGetPost<Entity>(obj:EntityTarget<Entity>, path:string, {app, connection}:Args) {
    // Get all the specified entities of a batch
    app.get(`/wine/get/${path}/:batchid`, async (req, res) => {
        // Declare the new wine object and get the details from the request
        const {params} = req;

        const nsList = await connection.manager.find(obj, {where: {batch_id: params.batchid}});


        res.status(nsList ? 200 : 400).send(JSON.stringify(nsList));
    });
}