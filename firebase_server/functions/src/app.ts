import * as  express from 'express';
import * as  cors from 'cors';
import * as  bodyParser from 'body-parser';
import * as apiRoute from './routes/api';
class App {

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
        this.express.use('/api', apiRoute.default);
    }

}

export default new App().express;