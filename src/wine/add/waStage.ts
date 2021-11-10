import {Batch} from "../../database/entities/Batch";
import {Application, Request, Response} from "express";
import {Connection, EntityTarget} from "typeorm";
import {isAuth} from "../../middleware/isAuth";

interface ns {
    batch: Batch;
}

interface Args {
    app:Application
    connection:Connection
}

const nsBatch = async (ns: ns, res: Response, req: Request, connection: Connection, path:string) => {
    // Get the specified batch
    const batch_id = req.body.batch_id;
    const batch = await connection.getRepository(Batch).findOne({ batch_id: batch_id });

    // If a Batch exists
    if (batch) {
        // Set the new stage's batch to point to the specified batch
        ns.batch = batch;

        // Try adding the new stage to the database
        try {
            await connection.manager.save(ns);
            res.statusMessage = "Batch with ID: " + batch_id + ", has been updated for: " + path;
            res.status(200).send();
        } catch (e) {
            // If the stage fails to be created, send the error back.
            res.statusMessage = e;
            res.status(400).send();
        }
    } else {
        // If the batch doesn't exist, send a error back.
        res.status(400).send();
    }
}

export function createAddPost<Entity extends ns> (obj:EntityTarget<Entity>, path:string, {app, connection}:Args){

    // Generate post with with path name
    app.post('/wine/add/' + path, isAuth,
        async (req, res) => {
            // Grab filtering object
            await nsBatch(connection.manager.create(obj, req.body), res, req, connection, path);
        });
}