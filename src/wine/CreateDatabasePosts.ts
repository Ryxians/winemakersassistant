import {Application} from "express";
import {Connection} from "typeorm";
import {WaKit} from "./add/waKit";
import {wgKit} from "./get/wgKit";
import {WaBatch} from "./add/waBatch";
import {wgBatch} from "./get/wgBatch";
import {Filtering} from "../database/entities/Filtering";
import {Fermentation} from "../database/entities/Fermentation";
import {Racking} from "../database/entities/Racking";
import {Output} from "../database/entities/Output";
import {createAddPost} from "./add/weStage";

interface Args {
    app:Application
    connection:Connection
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

    //wine/add/fermentation
    createAddPost(Fermentation, Fermentation.name, args);

    //wine/add/filtering
    createAddPost(Filtering, Filtering.name, args);

    //wine/add/racking
    createAddPost(Racking, Racking.name, args);

    //wine/add/output
    createAddPost(Output, Output.name, args);

}
