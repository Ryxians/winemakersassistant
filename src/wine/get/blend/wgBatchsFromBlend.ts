import {Connection} from "typeorm";
import {Blend_to_Batch} from "../../../database/entities/Blend_to_Batch";
import {Application} from "express";
import {Blended_Batch} from "../../../database/entities/Blended_Batch";
import {Wine} from "../../../database/entities/Wine";

interface Args {
    app: Application
    connection: Connection
}

const getBatchsFromBlend = async (connection: Connection, blend_id: string | number) => {
    let results = await connection.manager.find(Blend_to_Batch, {where: {blend_id: blend_id}, relations: ["batch"]});

    return results;
}

const getWineForBatch = async (connection: Connection, wine_id: string | number) => {
    let results = await connection.manager.findOne(Wine, {where: {wine_id: wine_id}});

    return results;
}

export const wgBatchsFromBlend = ({app, connection}: Args): void => {
    // Get all the batches of a wine
    app.get('/wine/get/blend/from/batchs/:blendid',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            let {params} = req;
            let blend_id = params.blendid;

            let blend = await connection.manager.findOne(Blended_Batch, {where: {blend_id: blend_id}, relations: ["wine"]});
            if (blend) {
                blend.blend_to_batch = await getBatchsFromBlend(connection, blend.blend_id);

                for (const {batch} of blend.blend_to_batch) {
                    let wine = await getWineForBatch(connection, batch.wine_id);
                    if (wine) {
                        batch.wine = wine;
                    }
                }

            }
            res.status(blend ? 200 : 400).send(JSON.stringify(blend));
        });
}