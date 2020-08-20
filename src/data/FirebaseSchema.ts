export type FirebaseSchema = {
    users: UsersNode,
    rooms: RoomsNode,
    counters: CountersNode,
    indexes: IndexesNode,
}

export type UsersNode = {
    [userID: string]: {
        email: string,
        username: string,
    }
}

export type RoomNode = {
    owner: string,
    shortcode: string,
    stream: Stream
};
export type RoomsNode = {
    [roomID: string]: RoomNode
}

export type IndexesNode = {
    "shortcode-to-roomID": {
        [shortcode: string]: string
    },
    "roomID-to-shortcode": {
        [roomID: string]: string
    }
}

export type ShortcodeCounter = number;

export type CountersNode = {
    shortcodeCounter: ShortcodeCounter
}

export type Stream = {
    startTime: number,
    endTime: number,
    themes: Themes
}

export type Themes = {
    [themeName: string]: {
        progressTowardsGoal: number,
        targetGoal: number
    }
}