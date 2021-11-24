import {Application} from "express";
import {Connection} from "typeorm";
import {Wine} from "../../database/entities/Wine";
import {Batch} from "../../database/entities/Batch";
import {isAuth} from "../../middleware/isAuth";

interface Args {
    app:Application
    connection:Connection
}

const getBatchsFromKit = async (connection: Connection, wineid: string | number) => {
    const wines = connection.manager.getRepository(Wine);

    const wine = await wines.findOne(wineid, {relations: ["batchs"]});
    return wine?.batchs;
}

export const wgBatch = ({app, connection}:Args):void => {
    // Get all the batches of a wine
    app.get('/wine/get/batch/:wineid', isAuth,
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;

            const batchs = await getBatchsFromKit(connection, params.wineid)

            res.status( batchs ? 200 : 400).send(JSON.stringify(batchs));
        });

    app.get('/wine/get/batch/:wineid/:active',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;

            // let batchs = await getBatchsFromKit(connection, params.wineid);

            let active = params.active == 'true';

            // Get batchs by wine id and whether they are active
            const batchs = await connection.manager.find(Batch, {where: {wine_id: params.wineid, active: active}, relations: ["wine"]});

            res.status( batchs ? 200 : 400).send(JSON.stringify(batchs));
        });

    // Get all active batchs
    app.get('/wine/get/batchs/:active',
        async (req, res) => {
            // Declare the new wine object and get the details from the request
            const {params} = req;
            const isActive = params.active == 'true';

            const batchs = await connection.manager.find(Batch, {where: {active: isActive}, relations: ["wine"]});
            res.status( batchs ? 200 : 400).send(JSON.stringify(batchs));
        });

    // Get a specific batch
    app.get('/wine/get/batch/from/:id',
    async (req, res) => {
        const {params} = req;
        const batch = await connection.manager.findOne(Batch, {where: {batch_id: params.id}, relations: ["wine"]});

        console.log(batch)
        res.status( batch ? 200 : 400).send(JSON.stringify(batch));
    });
}