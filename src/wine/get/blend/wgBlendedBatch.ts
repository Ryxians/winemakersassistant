import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../../database/entities/Wine";
import {Batch} from "../../../database/entities/Batch";
import {param} from "express-validator";
import {Blended_Batch} from "../../../database/entities/Blended_Batch";

interface Args {
    app:Application
    connection:Connection
}

const getBlendsFromKit = async (connection: Connection, wineid: string | number) => {
    const wines = connection.manager.getRepository(Wine);

    const wine = await wines.findOne(wineid, {relations: ["blends"]});
    const batchs = wine?.blends;

    return batchs;
}

export const wgBlendedBatch = ({app, connection}:Args):void => {
    // Get all the batches of a wine
    app.get('/wine/get/blend/batch/:wineid',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;

            const batchs = await getBlendsFromKit(connection, params.wineid)

            res.status( batchs ? 200 : 400).send(JSON.stringify(batchs));
        });

    app.get('/wine/get/blend/batch/:wineid/:active',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;

            // let batchs = await getBatchsFromKit(connection, params.wineid);

            let active = params.active == 'true';

            // Get batchs by wine id and whether they are active
            const blends = await connection.manager.find(Blended_Batch, {where: {wine_id: params.wineid, active: active}, relations: ["wine"]});

            res.status( blends ? 200 : 400).send(JSON.stringify(blends));
        });

    // Get all active batchs
    app.get('/wine/get/blend/batchs/:active',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;
            const isActive = params.active == 'true';

            const blends = await connection.manager.find(Blended_Batch, {where: {active: isActive}, relations: ["wine"]});
            res.status( blends ? 200 : 400).send(JSON.stringify(blends));
        });

    // get all the kits
    // app.get('/wine/get/batch',
    //     async (req, res) => {
    //         // Declare the new wine object and get the details from the request
    //         const wines = await connection.manager.find(Wine);
    //         res.status(wines ? 200 : 400).send(JSON.stringify(wines));
    //         console.log("Kits requested!")
    //     });
}