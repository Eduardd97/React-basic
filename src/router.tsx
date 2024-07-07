import { createBrowserRouter } from "react-router-dom";
import { Counter } from "./components/Counter";
import { LoginForm } from "./components/LogimFormComponent/LoginForm";
import { UserProfile } from "./components/UserProfieComponent/UserProfile";
import { UsersList } from "./components/UsersListComponent/UsersList.1";
import { users } from "./const";
import { Users } from "./components/UsersListComponent/Users";
import { Todos } from "./components/TodosComponent/Todos";
import { UserForm } from "./components/UserFormComponent/UserForm";
import { ImageCarousel } from "./components/CarouselComponent/ImageCarousel";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ImageCarousel />,
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
    {
        path: "/user-create",
        element: <UserForm />,
    },
    {
        path: "/user-create/:email",
        element: <UserForm />,
    },
]);
