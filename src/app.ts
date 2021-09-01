import express, {Application, Request, Response} from 'express';
import {CreateUser} from "./user/CreateUser";
import {LoginUser} from "./user/LoginUser";

// Initialize Express App
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Specify json use
app.use(express.json());


// Create a new user, passes the express app
CreateUser({app});

// Authenticates provided username and password
LoginUser({app});


// Listen to port 5000 for requests
app.listen(PORT, () => console.log(`Hello from express! Listening to ${PORT}`));