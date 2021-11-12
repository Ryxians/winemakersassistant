import {Batch} from "../../database/entities/Batch";
import {Application, Request, Response} from "express";
import {Connection, EntityTarget} from "typeorm";
import {isAdmin, isAuth} from "../../middleware/isAuth";

interface ns {
    batch: Batch;
    date: Date;
}

interface Args {
    app:Application
    connection:Connection
}
export function CreatePutPost<Entity extends ns> (obj:EntityTarget<Entity>, path:string, {app, connection}:Args){

    // Generate post with with path name
    app.put('/wine/put/' + path, isAdmin,
        async (req, res) => {
            // Grab filtering object
            const date = new Date(req.body.date)
            const objRepository = connection.getRepository(obj);
            const existingObject = await objRepository.findOne({date: date});
            if (existingObject) {
                await objRepository.delete(existingObject)
                await objRepository.merge(existingObject, req.body);

                // @ts-ignore
                let results = await objRepository.save(existingObject)
                if (results) {
                    res.statusMessage = "Updated " + path +  "!"
                    res.status(200).send()
                } else {
                    res.statusMessage = "Failed to update information."
                    res.status(400).send();
                }
            } else {
                res.statusMessage = "Failed miserably."
                res.status(400).send();
            }
            // await nsBatch(connection.manager.create(obj, req.body), res, req, connection, path);
        });
}