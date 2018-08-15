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

            await admin.firestore().collection('feedback')
                .add({
                    ...req.body,
                    createdOn: moment().format(),
                    timeZone: req.get('timeZone'),
                    machineId: req.get('machineId')
                }).catch(error => {
                    console.log(error);
                })

            res.status(202).json({ status: 'success' });
        } else {
            res.status(400).json({ status: 'failure', message: 'Missing Header' });
        }
    }
}

export default new FeedbackRoutes().getRoutes();