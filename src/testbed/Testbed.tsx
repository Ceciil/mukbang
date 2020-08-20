import React from 'react';
import 'firebase/auth';
import 'firebase/database';
import app from 'firebase/app';
import { v4 } from 'uuid';

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


export const TestBed = () => {
    const db = useDB();
    const [rooms, setRooms] = React.useState<Room[]>([]);
    React.useEffect(() => {
        db.room.listObserver(r => setRooms(r));
    }, []);


    return (
        <div onClick={async () => {
            const rooms = await db.room.create();
            console.log(rooms);
        }}>
            {JSON.stringify(rooms, null, 2)}
        </div>
    )
}

const useDB = () => {
    return React.useContext(DatabaseContext);

}

export interface Database {
    getFood: () => void;
    room: RoomManager;
    auth: AuthManager;
    user: UserManager;
}

export class FirebaseDatabase implements Database {
    public room: RoomManager;
    public auth: AuthManager;
    public user: UserManager;

    constructor() {
        app.initializeApp(config);
        const auth = app.auth();
        const db = app.database();
        this.auth = new AuthManager(db, auth);
        this.user = new UserManager(db, auth);
        this.room = new RoomManager(db, this.user);
    }

    getFood =  () => {
        console.log('got food');
    }

}

export class NullDatabase implements Database {
    public auth = {} as any;
    public room = {} as any;
    public user = {} as any;

    getFood = () => {
        throw new Error('Not Implemented');
    }
    
}

export const DatabaseContext = React.createContext<Database>(new NullDatabase());


export type Room = {
    roomID: string,
    owner: string,
    shortCode: string
}

export type FirebaseRoomsNode = {
    [roomID: string] : {
        owner: string,
        shortCode: string
    }
}

const counterToShortcode = (counter: number, shortcodeLength: number) => {    
    let code = '';
    for (let i = 0; i < shortcodeLength; i++) {
        const charOffset = Math.floor(counter / Math.pow(26, i) % 26);
        code += String.fromCharCode(65 + charOffset);
    }

    return code;
}

export class RoomManager {
    constructor(
        private db: app.database.Database, 
        private user: UserManager
    ) {}

    create = async () => {
        const uuid = v4();
        const { committed, snapshot: shortCodeCount } = await this.db.ref('counters/shortCodeCounter')
            .transaction((count: number) => count += 1);

        if (!committed) {
            throw new Error('Could not allocate shortCode');
        }

        const shortCode = counterToShortcode(shortCodeCount.val(), 5);
        this.db.ref(`rooms/${uuid}`).set({
            owner: await this.user.id(),
            shortCode
        });

        this.db.ref(`indexes/roomID-to-shortcode/${uuid}`).set(shortCode);
        this.db.ref(`indexes/shotcode-to-roomID/${shortCode}`).set(uuid);
    }

    list = async (): Promise<Room[]> => {
        const roomSnapshot: FirebaseRoomsNode = (await this.db.ref('rooms').once('value')).val();
        const ret = [];
        for (let k in Object.keys(roomSnapshot)) {
            ret.push({ roomID: k, ...roomSnapshot[k] });
        }

        return ret;
    }

    listObserver = (callback: (rooms: Room[]) => void) => {
        this.db.ref('rooms').on('value', (roomsSnapshot) => {
            const ret = [];
            const rooms = roomsSnapshot.val();
            console.log(rooms);
            for (let k of Object.keys(rooms)) {
                ret.push({ roomID: k, ...rooms[k] });
            }

            callback(ret);
        })
    }

    get = () => {
        console.log('get room');
    }
}

export class AuthManager {
    constructor(
        private db: app.database.Database,
        private auth: app.auth.Auth
    ) {}

    createUserWithEmailAndPassword = async (email: string, password: string) => {
        const creds = await this.auth.createUserWithEmailAndPassword(email, password);
        const uid = creds?.user?.uid;
        if (!uid) {
            throw new Error('Could not create user');
        }

        this.db.ref(`users/${uid}`).set({});
    }

    signInWithEmailAndPassword = (email: string, password: string) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut = () => {
        this.auth.signOut();
    }
}

export class UserManager {
    constructor(
        private db: app.database.Database,
        private auth: app.auth.Auth
    ) {}

    id = () => {
        return this.auth.currentUser?.uid;
    }

    email = () => {
        return this.auth.currentUser?.email;
    }

    user = () => {
        return this.auth.currentUser?.toJSON();
    }
}

