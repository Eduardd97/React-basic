import {
    Dispatch,
    FC,
    PropsWithChildren,
    createContext,
    useState,
} from "react";
import { APIUserType } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AppContextType = {
    users: APIUserType[];
    setUsers?: Dispatch<APIUserType[]>;

    createUser?: (user: APIUserType) => APIUserType;

    deleteUser?: (user: APIUserType) => void;

    editUser?: (email: string, updateUserdData: APIUserType) => void

    searchUser?: (email: string) => APIUserType | null;
};

export const AppContext = createContext<AppContextType>({
    users: [],
});

export const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const { get, set } = useLocalStorage();

    const [users, setUsers] = useState<APIUserType[]>(
        get("users") || []
    );

    const createUser = (user: APIUserType) => {
        const updatedUsers = [...users, user];

        setUsers(updatedUsers as Array<APIUserType>);
        set("users", updatedUsers);

        return user;
    };

    const deleteUser = (user: APIUserType) => {
        const updatedUsers = (users as Array<APIUserType>).filter(
            ({ email }) => email !== user.email
        );

        setUsers(updatedUsers as Array<APIUserType>);
        set("users", updatedUsers);
    };

    const editUser = (email: string, updateUserdData: APIUserType) => {
        const updatedUsers = users.map(user => 
            user.email === email ? { ...user, ...updateUserdData } : user
        );

        setUsers(updatedUsers as Array<APIUserType>);
        set("users", updatedUsers);
    }

    const searchUser = (email: string) => {
        const foundUser = users.find(user => user.email.includes(email) ) || null;

        // navigate("/users");

        return foundUser
    }

    return (
        <AppContext.Provider
            value={{ users, setUsers, createUser, deleteUser, editUser, searchUser }}
        >
            {children}
        </AppContext.Provider>
    );
};
