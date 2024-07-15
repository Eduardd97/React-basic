import {
    Dispatch,
    FC,
    PropsWithChildren,
    createContext,
    useState,
} from "react";
import { APIUserType, PostsType, TodosType } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { posts, todos } from "../const";

type AppContextType = {
    users: APIUserType[];
    setUsers?: Dispatch<APIUserType[]>;

    createUser?: (user: APIUserType) => APIUserType;

    deleteUser?: (user: APIUserType) => void;

    editUser?: (email: string, updateUserdData: APIUserType) => void

    searchUser?: (email: string, name: string) => APIUserType | null;

    searchTodo?: (title: string, text: string) => TodosType | null;
    
    searchPost?: (title: string, body: string) => PostsType | null;
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

    // const searchUser = (email: string, name: string) => {
    //     const foundUser = users.find(user => user.email.includes(email) ) || users.find(user => user.name.includes(name)) || null;

    //     return foundUser
    // }

    const searchUser = (email: string, name: string): APIUserType | null => {
        const foundByEmail = email ? users.find(user => user.email.toLowerCase().includes(email.toLowerCase())) : null;
        const foundByName = name ? users.find(user => user.name.toLowerCase().includes(name.toLowerCase())) : null;
    
        return foundByEmail || foundByName || null;
    };

    const searchTodo = (title: string, text: string): TodosType | null => {
        const foundByTodoTitle = title ? todos.find(todo => todo.title.toLowerCase().includes(title.toLowerCase())) : null;
        const foundByTodoText = text ? todos.find(todo => todo.text?.toLowerCase().includes(text.toLowerCase())) : null;

        return foundByTodoTitle || foundByTodoText || null;
    }

    const searchPost = (title: string, body: string): PostsType | null => {
        const foundByPostsTitle = title ? posts.find(post => post.title.toLowerCase().includes(title.toLowerCase())) : null;
        const foundByPostsText = body ? posts.find(post => post.body.toLowerCase().includes(body.toLowerCase())) : null;

        return foundByPostsTitle || foundByPostsText || null;
    }

    return (
        <AppContext.Provider
            value={{ users, setUsers, createUser, deleteUser, editUser, searchUser, searchTodo, searchPost }}
        >
            {children}
        </AppContext.Provider>
    );
};
