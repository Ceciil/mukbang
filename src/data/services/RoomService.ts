import app from 'firebase/app';
import { v4 } from 'uuid';

import { UserService } from './UserService';
import { Room } from '../models';
import { ShortcodeCounter, RoomsNode } from '../FirebaseSchema';
import { start } from 'repl';

export class RoomService {
  constructor(private db: app.database.Database, private user: UserService) {}

  // create a room
  create = async (details: {
    startTime: number,
    endTime: number,
    themes: any,
  }) => {
    const uuid = v4();
    const { committed, snapshot: shortCodeCounter } = await this.db
      .ref('counters/shortCodeCounter')
      .transaction((count: ShortcodeCounter) => (count += 1));

    if (!committed) {
      throw new Error('Could not allocate shortCode');
    }

    const shortcodeCounter: ShortcodeCounter = shortCodeCounter.val();
    const shortcode = counterToShortcode(shortcodeCounter, 5);
    await this.db.ref(`rooms/${uuid}`).set({
      roomID: uuid,
      owner: await this.user.id(),
      shortcode,
      stream: details,
    });

    this.db.ref(`indexes/roomID-to-shortcode/${uuid}`).set(shortcode);
    this.db.ref(`indexes/shotcode-to-roomID/${shortcode}`).set(uuid);

    return shortcode;
  };

  // update a room's goals
  update = async (code: string, form: any) => {
    const snapshot = await this.db.ref(`indexes/shotcode-to-roomID/${code}`).once('value');
    const roomCode = snapshot.val();
    const roomSnapshot = await this.db.ref(`rooms/${roomCode}`).once('value');
    const currentSnapshot = roomSnapshot.val().stream.themes;

    for (let item in form) {
      currentSnapshot[item].currentGoal += +form[item];
    }
    // {sTime: eTime:, stream: themes: {item1}}

    
    console.log('a', currentSnapshot);

    await this.db.ref(`rooms/${roomCode}/stream/themes`).update(currentSnapshot,);

    const readback = await this.db.ref(`rooms/${roomCode}/stream/themes`).once('value');
    console.log('readback', readback.val());

  };

  // get a specific room
  get = async (code: string) => {
    const snapshot = await this.db.ref(`indexes/shotcode-to-roomID/${code}`).once('value');
    const roomCode = snapshot.val();
    const roomSnapshot = await this.db.ref(`rooms/${roomCode}`).once('value');

    return roomSnapshot.val();
  };

  // lists rooms
  list = async (): Promise<Room[]> => {
    const roomsSnapshot = await this.db.ref('rooms').once('value');
    const roomsNode: RoomsNode = roomsSnapshot.val();

    return roomNodesToRoom(roomsNode);
  };

  // applies callback to changes to room
  onChange = (callback: (rooms: Room[]) => void) => {
    this.db.ref('rooms').on('value', (roomsSnapshot, k) => {
      const roomsNode: RoomsNode = roomsSnapshot.val();
      console.log('hello from onchange in room service');
      callback(roomNodesToRoom(roomsNode));
    });
  };
}

// converts firebase RoomsNodes to Rooms
const roomNodesToRoom = (node: RoomsNode): Room[] => {
  const rooms = [];
  for (let k of Object.keys(node)) {
    rooms.push({ roomID: k, ...node[k] });
  }
  return rooms;
};

// converts a numeric counter to shortcode, e.g. 1 -> AAAAA, 2 -> BAAA
const counterToShortcode = (counter: number, shortcodeLength: number) => {
  let code = '';
  for (let i = 0; i < shortcodeLength; i++) {
    const charOffset = Math.floor((counter / Math.pow(26, i)) % 26);
    code += String.fromCharCode(65 + charOffset);
  }

  return code;
};
