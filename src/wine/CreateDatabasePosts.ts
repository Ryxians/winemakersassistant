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
import { waBlendedBatch } from "./add/blend/waBlendedBatch"
import {wgBlendedBatch} from "./get/blend/wgBlendedBatch";
import {CreatePutPost} from "./put/wpStage";
import {waBatchToBlend} from "./add/blend/waBatchToBlend";
import {wgBatchsFromBlend} from "./get/blend/wgBatchsFromBlend";
import {wpBatchInactive} from "./put/wpBatchInactive";
import {GetWineMonthSheet} from "./get/sheet/GetWineMonthSheet";
import {User} from "../database/entities/User";
import {Blended_Output} from "../database/entities/Blended_Output";
import {createBlendedOutputPost} from "./add/blend/waBlendedOutput";

interface Args {
    app:Application
    connection:Connection
}
export interface ns {
    batch: Batch;
    user_id?:number;
    bottleTeam?:User;
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

    // Change Batch activity
    wpBatchInactive(args);

    //wine/add/blend/batch
    waBlendedBatch(args)

    //wine/get/blend/batch
    wgBlendedBatch(args)

    // Add Batch to Blend
    //wine/add/blend/batch/:blendid
    waBatchToBlend(args);

    wgBatchsFromBlend(args);

    // Fermentation
    CreateGetAndAdd(Fermentation, Fermentation.name, args);

    // Filtering
    CreateGetAndAdd(Filtering, Filtering.name, args);

    // Racking
    CreateGetAndAdd(Racking, Racking.name, args);

    // Output
    CreateGetAndAdd(Output, Output.name, args);

    // Blended Output
    createBlendedOutputPost(args);
    CreateGetPost(Blended_Output, 'blended_output', args, true);

    // Excel Sheet
    GetWineMonthSheet(args);



}
