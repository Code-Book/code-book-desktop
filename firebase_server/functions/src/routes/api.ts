import * as express from 'express';
import * as feedbackRoute from './api/feedback';

export class ApiRoutes {

    public getRoutes() {
        const router = express.Router();
        router.use('/feedback', feedbackRoute.default);
        return router;
    }
}

export default new ApiRoutes().getRoutes();