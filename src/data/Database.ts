import 'firebase/auth';
import 'firebase/database';
import app from 'firebase/app';

import {
    AuthService,
    UserService,
    RoomService
} from './services';

export interface Database {
    auth: AuthService;
    user: UserService;
    room: RoomService;
}

export class FirebaseDatabase implements Database {
    public auth: AuthService;
    public user: UserService;
    public room: RoomService;

    constructor() {
        app.initializeApp(config);
        const auth = app.auth();
        const db = app.database();
        this.auth = new AuthService(db, auth);
        this.user = new UserService(db, auth);
        this.room = new RoomService(db, this.user);
    }
}

export class NullDatabase implements Database {
    public auth = {} as any;
    public room = {} as any;
    public user = {} as any;
}

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
