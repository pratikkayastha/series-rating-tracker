import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { Request, Response, NextFunction, Router } from "express";
import { Routes } from './routes/seriesRoute';
import { config as dotenvConfig } from "dotenv";

class App {

    public app: express.Application;
    public seriesRoutes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.seriesRoutes.routes(this.app);

        // Handle 404
        this.app.use((req:Request, res:Response, next:NextFunction) => {
            res.status(404).send({'error': 'NOT FOUND'});
        });

        //Global Error Handler
        this.app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
            console.log(err);

            res.status(500).send(err.stack);
        });
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Enable CORS
        this.app.use(cors());
        // Configure .env config
        dotenvConfig();
    }

}

export default new App().app;