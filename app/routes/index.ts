import { Application, json, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";

import { authorize } from "../utility/authorize";
import { ResponseHandler } from "../utility/response";
import  fileupload from "express-fileupload"
import { excludedPaths, routes } from "./routes.data";
// import { jobScheduler } from "../utility/jobScheduler";

export const registerRoutes = (app: Application) => {
    app.use(json());
    app.use(cors());
    app.use(helmet());

    app.use(authorize(excludedPaths));
    
    for (const route of routes) {
        app.use(route.path, route.router);
    }

    // 404
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.status(404).send(new ResponseHandler(null, { message: 'Url doesn\'t exists' }));
    })

    // Error
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        console.log(error);
        res.status(error.statusCode ?? 500).send(new ResponseHandler(null, error));
    })
}