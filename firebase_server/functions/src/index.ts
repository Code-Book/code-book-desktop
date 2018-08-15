import * as functions from 'firebase-functions';
import * as app from './app';

const api = functions.https.onRequest(app.default);

module.exports = {
    api
}
