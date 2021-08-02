import express, {Application, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {CreateUser} from "./user/CreateUser";
import {LoginUser} from "./user/LoginUser";

// Initialize Express App
const app: Application = express();

// To be removed in favor of Users.ts
const users: { username:string, password: string }[] = [
    {username: "root", password: "$2b$10$jCweHL510g5Gku1NKuSbVuTJY.ZjVUGcbMAXrl9ll/g1WiOzSYFD2"}
]

// Specify json use
app.use(express.json());

// Get list of users TOBE MOVED
app.get('/users', ((req: Request, res: Response) => {
    res.json(users);
}));

// Create a new user, passes the express app
CreateUser({app});

// Authenticates provided username and password
// TOBE MOVED
LoginUser({app});


// Listen to port 5000 for requests
app.listen(5000, () => console.log("Hello from express!"))