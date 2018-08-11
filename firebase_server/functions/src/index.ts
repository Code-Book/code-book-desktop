import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import * as  express from 'express';
import * as  cors from 'cors';
import * as  bodyParser from 'body-parser';

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async (req, res) => {
    try {
        await admin.firestore().collection('feedback')
            .add(req.body)
        res.send(202);
    } catch (error) {
        res.send(500);
    }
});


exports.feedback = functions.https.onRequest(app);
