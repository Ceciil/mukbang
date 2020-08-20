export type Room = {
    roomID: string,
    owner: string,
    shortcode: string,
    stream: Stream
}

export type Stream = {
    startTime: number,
    endTime: number,
    themes: Themes,

}

export type Themes = {
    [themeName: string]: {
        progressTowardsGoal: number,
        targetGoal: number
    }
}