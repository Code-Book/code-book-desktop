import * as express from 'express';
import * as moment from 'moment-timezone';
import * as admin from 'firebase-admin';
admin.initializeApp();

export class FeedbackRoutes {

    public getRoutes() {
        const router = express.Router();
        router.post('/', this.feedbackPost);
        return router;
    }

    public async feedbackPost(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.get('timeZone') && req.get('machineId')) {
            try {
                await admin.firestore().collection('feedback')
                    .add({
                        ...req.body,
                        createdOn: moment().format(),
                        timeZone: req.get('timeZone'),
                        machineId: req.get('machineId')
                    })
                res.json({
                    status: 'success'
                }).sendStatus(202);
            } catch (error) {
                res.json({
                    status: 'failure',
                    message: 'Internal Server error'
                }).sendStatus(500);
            }
        } else {
            res.json({
                status: 'failure',
                message: 'Missing Header'
            }).sendStatus(400);
        }
    }
}

export default new FeedbackRoutes().getRoutes();