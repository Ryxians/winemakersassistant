import {Application} from "express";
import {Connection, EntityTarget} from "typeorm";
import {User} from "../../database/entities/User";

interface Args {
    app:Application
    connection:Connection
}

interface ns {
    user_id?:number
    bottleTeam?:User
}

export function CreateGetPost<Entity extends ns>(obj:EntityTarget<Entity>, path:string, {app, connection}:Args) {
    // Get all the specified entities of a batch
    app.get(`/wine/get/${path}/:batchid`, async (req, res) => {
        // Declare the new wine object and get the details from the request
        const {params} = req;

        const nsList = await connection.manager.find(obj, {where: {batch_id: params.batchid}});

        if (nsList[0]?.user_id) {
            for (const s of nsList) {
                s.bottleTeam = await connection.manager.findOne(User, {where: {id: s.user_id}});
            }
        }

        res.status(nsList ? 200 : 400).send(JSON.stringify(nsList));
    });
}