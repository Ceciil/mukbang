import React from 'react';
import {Database, FirebaseDatabase, NullDatabase} from './Database';
import { Room , CurrentUser} from './models';

const firebase = new FirebaseDatabase();

type DataContextValue = {
    db: Database,
    user?: CurrentUser,
    rooms: Room[]
}
const DataContext = React.createContext<DataContextValue>({
    db: new NullDatabase(),
    user: null,
    rooms: []
});

interface DataContainerProps {
    children: React.ReactNode
}
export const DataContainer = (props: DataContainerProps) => {
    const { children } = props;
    const { current: db } = React.useRef(firebase);
    const [rooms, setRooms] = React.useState<Room[]>([]);
    const [user, setUser] = React.useState<CurrentUser>(null);

    React.useEffect(() => {
        db.room.onChange(setRooms);
        db.user.onChange(setUser);
    }, [db]);

    const value = {
        db,
        user,
        rooms
    };

    return (
       <DataContext.Provider value={value}>
           {children}
       </DataContext.Provider>
    );
}

export const useDB = () => {
    return React.useContext(DataContext);
}