const serviceAccount = require('../movie-helper-994bf-firebase-adminsdk-fbsvc-3308739038.json');
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://movie-helper-994bf.firebaseio.com"
});

export const db = admin.firestore();
