import {
    Dispatch,
    FC,
    PropsWithChildren,
    createContext,
    useState,
} from "react";
import { APIUserType, Users } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AppContextType = {
    users: Users[] | APIUserType[];
    setUsers?: Dispatch<Users[] | APIUserType[]>;

    createUser?: (user: APIUserType | Users) => APIUserType | Users;

    deleteUser?: (user: APIUserType | Users) => void;

    // addUser?: () =>
};

export const AppContext = createContext<AppContextType>({
    users: [],
});

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { get, set } = useLocalStorage();

    const [users, setUsers] = useState<Users[] | APIUserType[]>(
        get("users") || []
    );

    const createUser = (user: APIUserType | Users) => {
        const updatedUsers = [...users, user];

        setUsers(updatedUsers as Array<APIUserType>);
        set("users", updatedUsers);

        return user;
    };

    const deleteUser = (user: APIUserType | Users) => {
        const updatedUsers = (users as Array<APIUserType>).filter(
            ({ email }) => email !== user.email
        );

        setUsers(updatedUsers as Array<APIUserType>);
        set("users", updatedUsers);
    };

    return (
        <AppContext.Provider
            value={{ users, setUsers, createUser, deleteUser }}
        >
            {children}
        </AppContext.Provider>
    );
};
