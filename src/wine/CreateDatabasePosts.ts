import {Application} from "express";
import {Connection} from "typeorm";
import {WaKit} from "./add/waKit";
import {wgKit} from "./get/wgKit";

interface Args {
    app:Application
    connection:Connection
}

export const CreateDatabasePosts = (args:Args) => {
    // NewWinePost
    WaKit(args)
    wgKit(args);
}