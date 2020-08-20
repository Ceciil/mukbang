import 'firebase/auth';
import 'firebase/database';
import app from 'firebase/app';

export class AuthService {
  constructor(private db: app.database.Database, private auth: app.auth.Auth) {}

  createUserWithEmailAndPassword = async (email: string, password: string) => {
    const creds = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = creds?.user?.uid;
    if (!uid) {
      throw new Error('Could not create user');
    }

    this.db.ref(`users/${uid}`).set({
      email: creds.user?.email,
      username: creds.user?.displayName,
    });
  };

  signInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut = async () => {
    return this.auth.signOut();
  };

  updatePassword = (password: string) => {
    return this.auth.currentUser?.updatePassword(password);
  };

  resetPassword = async (email: string) => {
    return this.auth.sendPasswordResetEmail(email);
  };
}
