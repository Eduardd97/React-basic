import {
    Dispatch,
    FC,
    PropsWithChildren,
    createContext,
    useState,
} from "react";
import { APIUserType, Users } from "../types";

type AppContextType = {
    users: Users[] | APIUserType[];
    setUsers?: Dispatch<Users[] | APIUserType[]>;

    createUser?: (user: APIUserType | Users) => APIUserType | Users
};

export const AppContext = createContext<AppContextType>({
    users: [],
});


export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [users, setUsers] = useState<Users[] | APIUserType[]>([]);

    console.log(users, "!!!!!!")

    const createUser = (user: APIUserType | Users) => {
        setUsers([...users, user] as APIUserType[]);

        return user;
    }
    return (
        <AppContext.Provider value={{ users, setUsers, createUser }}>
            {children}
        </AppContext.Provider>
    );
};
