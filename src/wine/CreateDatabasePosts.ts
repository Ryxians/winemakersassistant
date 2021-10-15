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

    // Destructure
    const {app, connection} = args;

    // Fermentation
    CreateGetAndAdd(Fermentation, Fermentation.name, args);

    // Filtering
    CreateGetAndAdd(Filtering, Filtering.name, args);

    // Racking
    CreateGetAndAdd(Racking, Racking.name, args);

    // Output
    CreateGetAndAdd(Output, Output.name, args);

}
