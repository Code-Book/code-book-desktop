import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import * as  express from 'express';
import * as  cors from 'cors';
import * as  bodyParser from 'body-parser';

const app = express();

import * as moment from 'moment-timezone';


app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async (req, res) => {
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


exports.feedback = functions.https.onRequest(app);
