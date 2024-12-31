import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import fs from 'fs';
import chalk from 'chalk';
import {User} from "../database/entities/User";
import path from "path";

declare module 'express-session' {
    export interface SessionData {
        isAuth: boolean
        role: number
        active: boolean
        user: User
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isAuth) {
        if (req.session.role === -1) {
            res.status(200).send();
        } else {
            next();


        }
    } else {
        res.status(403).send();
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isAuth && req.session.active) {
        if (req.session.role === 1) {
            next();
        }
    } else {
        res.status(403).send();
    }
}

export const doLog = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        const current_datetime = new Date();
        const {id, username} = req.session.user;
        let formatted_date =
            current_datetime.getFullYear() +
            "-" +
            (current_datetime.getMonth() + 1) +
            "-" +
            current_datetime.getDate();


        let p = path.join(__dirname, "logs");

        fs.mkdir(p, () => {
            // This will scream an error if the logs folder already exists
            // However, we don't care.
            // We may move this to the server start so it can scream its error once.
            })

        // fs.access(p, err => err && fs.mkdir(p, err => err && console.log(err)));

        p = path.join(p, `${formatted_date}.txt`);

        formatted_date +=
            " " +
            current_datetime.getHours() +
            ":" +
            current_datetime.getMinutes() +
            ":" +
            current_datetime.getSeconds();

        let log =
            `[LOGGING AT: ${chalk.blue(formatted_date)}]: ${username} (${id}) >>\n`
            + `Request: ${req.url} \n`
            + `Request Method: ${req.method}\n`
            + `Response Status: ${res.statusCode}\n`
            + `Response Message: ${res.statusMessage}\n`;


        fs.appendFile(p, log + "\n", err => {
            if (err) {
                console.log(err);
            }
        });
    }
    next();
}