"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const moment = require("moment-timezone");
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.get('timeZone') && req.get('machineId')) {
        try {
            yield admin.firestore().collection('feedback')
                .add(Object.assign({}, req.body, { createdOn: moment().format(), timeZone: req.get('timeZone'), machineId: req.get('machineId') }));
            res.json({
                status: 'success'
            }).sendStatus(202);
        }
        catch (error) {
            res.json({
                status: 'failure',
                message: 'Internal Server error'
            }).sendStatus(500);
        }
    }
    else {
        res.json({
            status: 'failure',
            message: 'Missing Header'
        }).sendStatus(400);
    }
}));
exports.feedback = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map