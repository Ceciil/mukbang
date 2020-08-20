import app from 'firebase/app';
import { UsersNode } from '../FirebaseSchema';
import { CurrentUser } from '../models';

export class UserService {
    constructor(
        private db: app.database.Database,
        private auth: app.auth.Auth
    ) {}

    id = () => {
        // todo get from db
        return this.auth.currentUser?.uid;
    }

    email = () => {
        // todo get from db
        return this.auth.currentUser?.email;
    }

    onChange = (callback: (currentUser: CurrentUser) => void) => {
        this.auth.onAuthStateChanged((user) => {
             console.log('user pre return', user);
            if (!user) return;
            const uid = user.uid;
            console.log(user);
            this.db.ref(`users/${uid}`).on('value', (userSnapshot) => {
                const userNode: UsersNode = userSnapshot.val();
                const user: CurrentUser = { userID: uid, ...userNode[uid] };
                callback(user)
            });
        });
    }
}