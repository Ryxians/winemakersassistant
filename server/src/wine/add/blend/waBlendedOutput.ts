import {Application, Request, Response} from "express";
import {Connection} from "typeorm";
import {Blended_Output} from "../../../database/entities/Blended_Output";
import {Blended_Batch} from "../../../database/entities/Blended_Batch";
import {isAuth} from "../../../middleware/isAuth";


interface Args {
    app:Application
    connection:Connection
}

// Recyled Code Converted to handle Blended Output
const nsBatch = async (out: Blended_Output, res: Response, req: Request, connection: Connection) => {
    // Get the specified batch
    const blend_id = req.body.blend_id;
    const blend = await connection.getRepository(Blended_Batch).findOne({ blend_id: blend_id });

    // If a Batch exists
    if (blend) {
        // Set the new stage's batch to point to the specified batch
        out.blend = blend;

        // Try adding the new stage to the database
        try {
            await connection.manager.save(out);
            res.statusMessage = "Batch with ID: " + blend_id + ", has been updated for: Blended Output";
            res.status(201).send();
        } catch (e) {
            // If the stage fails to be created, send the error back.
            res.statusMessage = JSON.stringify(e)
            res.status(400).send();
        }
    } else {
        // If the batch doesn't exist, send a error back.
        res.status(400).send();
    }
}

export function createBlendedOutputPost({app, connection}:Args){

    // Generate post with with path name
    app.post('/wine/add/blended_output', isAuth,
        async (req, res, next) => {
            // Grab filtering object
            await nsBatch(connection.manager.create(Blended_Output, req.body), res, req, connection);
            next();
        });
}