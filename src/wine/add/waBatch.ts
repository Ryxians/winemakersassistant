import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../database/entities/Wine";
import {Batch} from "../../database/entities/Batch";
import {isAuth} from "../../middleware/isAuth";

interface Args {
    app:Application
    connection:Connection
}

export const WaBatch = ({app, connection}:Args):void => {

    // When someone posts to the path
    app.post('/wine/add/batch', isAuth,
        async (req, res) => {
            // Grab the wine object and get the details from the request
            const wine_id = req.body.wine_id;
            const wine = await connection.getRepository(Wine).findOne({ wine_id: wine_id });

            // Get the new Batch
            const newBatch:Batch = connection.manager.create(Batch, req.body);

            // If the wine exists
            if (wine) {
                // Set the batches wine and make it active
                newBatch.wine = wine;
                newBatch.active = true;

                // Attempt to submit new batch to database
                // If failed, send the error.
                try {
                    await connection.manager.save(newBatch);
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