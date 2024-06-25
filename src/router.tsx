import { createBrowserRouter } from "react-router-dom";
import { Counter } from "./components/Counter";
import { LoginForm } from "./components/LoginForm";
import App from "./App";
import { UserProfile } from "./components/UserProfile";
import { UsersList } from "./components/UsersList.1";

const users = [
    {
        name: "Alice Johnson",
        age: 28,
        password: "alice123",
        email: "alice.johnson@example.com",
    },
    {
        name: "Bob Smith",
        age: 34,
        password: "bobSecure!789",
        email: "bob.smith@example.com",
    },
    {
        name: "Charlie Brown",
        age: 22,
        password: "charlie!pass",
        email: "charlie.brown@example.com",
    },
    {
        name: "Diana Prince",
        age: 30,
        password: "diana@wonder",
        email: "diana.prince@example.com",
    },
    {
        name: "Eve Adams",
        age: 26,
        password: "eve2024",
        email: "eve.adams@example.com",
    },
];

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
        element: (
            <UsersList users = {users} />
        ),
    },
]);
