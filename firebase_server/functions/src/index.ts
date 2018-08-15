import * as functions from 'firebase-functions';
import * as app from './app';

exports.api = functions.https.onRequest(app.default);
