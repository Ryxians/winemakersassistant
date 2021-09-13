import express, {Application, Request, Response} from 'express';
import {CreateUser} from "./user/CreateUser";
import {LoginUser} from "./user/LoginUser";
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import dotenv from "dotenv";
import {User} from "./database/entities/User";

dotenv.config();

// Initialize Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to database
createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'WMA',
    entities: [
        User
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // Create a new user, passes the express app
    CreateUser({app, connection});

    // Authenticates provided username and password
    LoginUser({app, connection});
}).catch(error => console.log(error))

// Specify json use
app.use(express.json());



// Listen to port 5000 for requests
app.listen(PORT, () => console.log(`Hello from express! Listening to ${PORT}`));