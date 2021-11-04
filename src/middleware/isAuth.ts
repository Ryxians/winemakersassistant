import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import session from "express-session";
import {Connection} from "typeorm";
import {Session} from "../database/entities/Session";

declare module 'express-session' {
    export interface SessionData {
        isAuth: boolean
        role: number
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
    if (req.session.isAuth) {
        if (req.session.role === 1) {
            next();
        }
    } else {
        res.status(403).send();
    }
}