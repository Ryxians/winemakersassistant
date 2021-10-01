import express, {Application, Request, Response} from 'express';
import {CreateUser} from "./users/CreateUser";
import {LoginUser} from "./users/LoginUser";
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import dotenv from "dotenv";
import {User} from "./database/entities/User";
import {Wine} from "./database/entities/Wine";
import {Batch} from "./database/entities/Batch";
import {Fermentation} from "./database/entities/Fermentation";
import {Racking} from "./database/entities/Racking";
import {Filtering} from "./database/entities/Filtering";
import {Output} from "./database/entities/Output";
import {Blended_Batch} from "./database/entities/Blended_Batch";
import {Blend_to_Batch} from "./database/entities/Blend_to_Batch";
import {Blended_Output} from "./database/entities/Blended_Output";
import {CreateDatabasePosts} from "./wine/CreateDatabasePosts";

dotenv.config();

// Initialize Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Specify json use
app.use(express.json());

// Connect to database
// Grabs the credentials from the .env
// Loads up the individual entites as tables
createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'WMA_Prot',
    entities: [
        User,
        Wine,
        Batch,
        Fermentation,
        Racking,
        Filtering,
        Output,
        Blended_Batch,
        Blend_to_Batch,
        Blended_Output
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    if (connection) {
        // Create a new users, passes the express app
        CreateUser({app, connection});

        // Authenticates provided username and password
        LoginUser({app, connection});

        // Load database creation post requests
        CreateDatabasePosts({app, connection});

        // Listen to port 5000 for requests
        app.listen(PORT, () => console.log(`Hello from express! Listening to ${PORT}`));
    }
    else {
        console.log("No Database Present!")
    }
}).catch(error => console.log(error))

