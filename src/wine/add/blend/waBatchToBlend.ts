import {Application} from "express";
import {Connection} from "typeorm";
import {Batch} from "../../../database/entities/Batch";
import {Blended_Batch} from "../../../database/entities/Blended_Batch";
import {isAuth} from "../../../middleware/isAuth";
import {Blend_to_Batch} from "../../../database/entities/Blend_to_Batch";

interface Args {
    app: Application
    connection: Connection
}

export const waBatchToBlend = ({app, connection}: Args): void => {

    // When someone posts to the path
    app.post('/wine/add/blend/to/batch/', isAuth,
        async (req,
               res) => {

            const blend = await connection.manager.findOne(Blended_Batch, req.body.blend_id);
            const batch = await connection.manager.findOne(Batch, req.body.batch_id);

            if (blend && batch) {
                let btb = connection.manager.create(Blend_to_Batch, req.body);
                btb.batch = batch;
                btb.blend = blend;

                try {
                    let results = await connection.getRepository(Blend_to_Batch).save(btb);
                    res.statusMessage = 'Added Batch to Blend: '
                    res.status(200).send(results);
                } catch (e) {
                    res.statusMessage = 'Failed to add Batch to Blend';
                    res.status(402).send(e);

                }


            } else {
                res.statusMessage = "Could not find" + blend ?
                    " Batch: " + req.body.batch_id
                    :
                    " Blend: " + req.params.blendid;
                res.status(401).send();
            }

        });
}