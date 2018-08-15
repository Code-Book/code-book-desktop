import * as functions from 'firebase-functions';
import { default as apiRoutes } from './routes/api';

module.exports = {
    api: functions.https.onRequest(apiRoutes)
}