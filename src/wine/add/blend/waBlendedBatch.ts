import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../../database/entities/Wine";
import {Blended_Batch} from "../../../database/entities/Blended_Batch";
import {isAuth} from "../../../middleware/isAuth";

interface Args {
    app:Application
    connection:Connection
}

export const waBlendedBatch = ({app, connection}:Args):void => {

    // When someone posts to the path
    app.post('/wine/add/blend/batch', isAuth,
        async (req, res) => {
            // Grab the wine object and get the details from the request
            const wine_id = req.body.wine_id;
            const wine = await connection.getRepository(Wine).findOne({ wine_id: wine_id });

            // Get the new Blended Batch
            const newBBatch:Blended_Batch = connection.manager.create(Blended_Batch, req.body);

            // If the wine exists
            if (wine) {
                // Set the batches wine and make it active
                newBBatch.wine = wine;
                newBBatch.active = true;

                // Attempt to submit new batch to database
                // If failed, send the error.
                try {
                    await connection.manager.save(newBBatch);
                    res.statusMessage = "Blend Created with id: " + newBBatch.blend_id;
                    res.status(200).send();
                } catch (e) {
                    res.statusMessage = e;
                    res.status(400).send();
                }
            } else {
                // If no batch, send an error.
                res.status(400).send();
            }
        });
}