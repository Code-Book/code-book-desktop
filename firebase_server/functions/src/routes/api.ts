import * as  express from 'express';
import * as  cors from 'cors';
import * as  bodyParser from 'body-parser';
import { default as feedbackRoute } from './api/feedback';

export class ApiRoutes {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(cors({ origin: true }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        // This route is already at /api
        this.express.use('/feedback', feedbackRoute);
    }
}

export default new ApiRoutes().express;