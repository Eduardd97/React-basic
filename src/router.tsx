import { createBrowserRouter } from "react-router-dom";
import { Counter } from "./components/Counter";
import { LoginForm } from "./components/LoginForm";
import App from "./App";
import { UserProfile } from "./components/UserProfile";
import { UsersList } from "./components/UsersList.1";
import { users } from "./const";
import { Users } from "./components/Users";
import { Todos } from "./components/Todos";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/counter",
        element: <Counter />,
    },
    {
        path: "/login",
        element: (
            <LoginForm
                email='default-email@gmai.com'
                password='default-password'
            />
        ),
    },
    {
        path: "/user-profile",
        element: (
            <UserProfile user={{ email: "", password: "", age: 0, name: "" }} />
        ),
    },
    {
        path: "/users-list",
        element: <UsersList users={users} />,
    },
    {
        path: "/users",
        element: <Users />,
    },
    {
        path: "/todos",
        element: <Todos />,
    },
]);
