import express, {Application, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {CreateUser} from "./user/CreateUser";


const app: Application = express();
const users: { username:string, password: string }[] = [
    {username: "root", password: "$2b$10$jCweHL510g5Gku1NKuSbVuTJY.ZjVUGcbMAXrl9ll/g1WiOzSYFD2"}
]

app.use(express.json());
app.get('/users', ((req: Request, res: Response) => {
    res.json(users);
}));

CreateUser({app});


app.post('/login',
    async (req: Request, res: Response) => {
    const user = users.find(user => user.username === req.body.username);
    console.log(req.body)
    if (user == null) {
        return res.status(400).send();
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send("Success");
        }
    } catch {
        res.status(500).send();
    }
    });
app.post('/user', (req: Request, res: Response) => {
    console.log("hello");
});


app.listen(5000, () => console.log("Hello from express!"))