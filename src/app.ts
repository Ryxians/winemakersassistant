import express, {Application, Request, Response} from 'express';
import {CreateUser} from "./users/CreateUser";
import {LoginUser} from "./users/LoginUser";
import "reflect-metadata";
import {createConnection} from "typeorm";
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
import ESession from 'express-session';
import {TypeormStore} from "connect-typeorm";
import {Session} from "./database/entities/Session";
import {GetUsers} from "./users/GetUsers";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import {LogoutUser} from "./users/LogoutUser";
import {UpdateUser} from "./users/UpdateUser";
import path from "path";
import {doLog} from "./middleware/isAuth";

dotenv.config();

// Initialize Express App
const app: Application = express();
const PORT = process.env.PORT || 3001;

//


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
        Blended_Output,
        Session
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    if (connection) {
        // Express Session
        let sessionRep = connection.getRepository(Session);
        const store = new TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 86400
        }).connect(sessionRep);

        app.use(cookieParser());
        app.use(bodyParser.urlencoded({extended: true}))

        app.use(ESession({
            secret: 'taco',
            saveUninitialized: false,
            resave: true,
            store
        }));

        app.use(doLog);

        // Create a new users, passes the express app
        CreateUser({app, connection});

        // Authenticates provided username and password
        LoginUser({app, connection});

        GetUsers({app, connection});

        LogoutUser({app, connection});

        GetUsers({app, connection});

        UpdateUser({app, connection});

        // Load database creation post requests
        CreateDatabasePosts({app, connection});

        // This will have Express Serve the React App
        // https://create-react-app.dev/docs/deployment/
        app.use(express.static(path.join(__dirname, "build")));
        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, "build", "index.html"))
        })


        // Listen to port 5000 for requests
        app.listen(PORT, () => console.log(`Hello from express! Listening to ${PORT}`));
    } else {
        console.log("No Database Present!")
    }
}).catch(error => console.log(error))

