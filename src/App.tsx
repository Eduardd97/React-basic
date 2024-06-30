import { Link } from "react-router-dom";
import "./App.css";
import { UserProfile } from "./components/UserProfile";
import { Users } from "./components/Users";

const App = () => {
    const headerRoutes = [
        { title: "Login page", path: "/login" },
        { title: "Counter page", path: "/counter" },
        { title: "User Profile", path: "user-profile" },
        { title: "Users List", path: "/users-list"},
        { title: "Users", path: "/users"}
    ];

    const user = {
        email: "email@gmail.com",
        password: "",
        age: 27,
        name: "Eduard",
    };

    return (
        <div className='red'>
            <h1>My first React project</h1>

            {headerRoutes.map((route) => (
                <Link to={route.path}>{route.title}</Link>
            ))}

            {/* <Link to='/counter'>Counter</Link>
              <Link to='/login'>Log-in</Link> */}

            <UserProfile user={user} />
        </div>
    );
};

export default App;
