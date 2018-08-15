import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import * as  express from 'express';
import * as  cors from 'cors';
import * as  bodyParser from 'body-parser';
import * as moment from 'moment-timezone';

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/feedback', async (req, res) => {
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
});


const api = functions.https.onRequest(app);

module.exports = {
    api
}
