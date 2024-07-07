import React, { useContext, useEffect, useState } from "react";
import { UsersList } from "./UsersList.1";
import { UserVariationsType } from "../../types";
import { AppContext } from "../../contexts/AppContext";
import { users } from "../../const";
import './Users.css'

export const Users = () => {
    const [usersType, setUsersType] = useState<UserVariationsType>("local");
    const userTypes: UserVariationsType[] = ["local", "server"];

    const { users: serverUsers, setUsers } = useContext(AppContext);

    // const [serverUsers, setServerUsers] = useState<APIUserType[]>([]);

    const changeUserType = (userType: UserVariationsType) =>
        setUsersType(userType);

    useEffect(() => {
        // client.get("/users").then(({ data }) => setUsers && setUsers(data));
    }, [setUsers]);

    // if (usersType === "Lokal") return <UsersList users={users} />;

    return (
        <div className="users">
            <nav>
                {userTypes.map((type) => (
                    <button
                        key={type}
                        className={type === usersType ? "active-tab" : "tab"}
                        onClick={() => changeUserType(type)}
                    >
                        {type}
                    </button>
                ))}
            </nav>
            <UsersList users={usersType === "local" ? users : serverUsers} />
        </div>
    );
};
