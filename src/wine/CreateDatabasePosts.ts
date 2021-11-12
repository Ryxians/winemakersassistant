import {Application} from "express";
import {Connection, EntityTarget} from "typeorm";
import {WaKit} from "./add/waKit";
import {wgKit} from "./get/wgKit";
import {WaBatch} from "./add/waBatch";
import {wgBatch} from "./get/wgBatch";
import {Filtering} from "../database/entities/Filtering";
import {Fermentation} from "../database/entities/Fermentation";
import {Racking} from "../database/entities/Racking";
import {Output} from "../database/entities/Output";
import {createAddPost} from "./add/waStage";
import {CreateGetPost} from "./get/wgStages";
import {Batch} from "../database/entities/Batch";
import {param} from "express-validator";
import { waBlendedBatch } from "./add/blend/waBlendedBatch"
import {wgBlendedBatch} from "./get/blend/wgBlendedBatch";
import {CreatePutPost} from "./put/wpStage";

interface Args {
    app:Application
    connection:Connection
}
interface ns {
    batch: Batch;
}

function CreateGetAndAdd<Entity extends ns>(obj: EntityTarget<Entity>, path: string, args:Args) {
    //wine/add/Entity
    createAddPost(obj, path, args);

    //wine/get/Entity
    CreateGetPost(obj, path, args);

    // @ts-ignore
    // Not sure why this started throwing an error. It wasnt earlier.
    CreatePutPost(obj, path, args);
}

export const CreateDatabasePosts = (args:Args) => {
    // NewWinePost NewKitPost
    WaKit(args)

    // Get Wine/Kit
    wgKit(args);

    // New Batch
    WaBatch(args);

    // Get Batch
    wgBatch(args)

    //wine/add/blend/batch
    waBlendedBatch(args)

    //wine/get/blend/batch
    wgBlendedBatch(args)

    // Fermentation
    CreateGetAndAdd(Fermentation, Fermentation.name, args);

    // Filtering
    CreateGetAndAdd(Filtering, Filtering.name, args);

    // Racking
    CreateGetAndAdd(Racking, Racking.name, args);

    // Output
    CreateGetAndAdd(Output, Output.name, args);

    // Destructure
    const {app, connection} = args;

    // Get a complete wine
    app.get('/wine/get/batchlog/:batchid', async (req, res) => {

        const {params} = req;

        let batch;

        try {
            batch = await connection.manager.findOne(Batch, {
                where: {batch_id: params.batchid},
                relations: ["Fermentation", "Filtering", "Racking", "Output"]
            });

        } catch (e) {
            batch = e;
        }



        res.status(batch ? 200 : 400).send(batch);
    })

}
