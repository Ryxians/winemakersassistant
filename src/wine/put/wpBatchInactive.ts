import {Application} from "express";
import {Connection} from "typeorm";
import {Batch} from "../../database/entities/Batch";
import {isAuth} from "../../middleware/isAuth";

interface Args {
    app:Application
    connection:Connection
}

export const wpBatchInactive = ({app, connection}:Args):void => {

    // When someone posts to the path
    app.put('/wine/put/batch/active/:id', isAuth,
        async (req, res) => {
        let batch = await connection.manager.findOne(Batch, req.params.id);
        if (batch) {
            batch.active = !batch.active;
            let batchr = await connection.manager.save(batch);
            res.statusMessage = "Batch: [" + batch.batch_id + "] has had its activity changed to be " + batch.active;
            res.status(200).send(batchr);
        } else {
            res.statusMessage = "No Batch Found with ID: " + req.params.id;
            res.status(400).send();
        }
        });
}