import React, { useContext, useEffect, useState } from "react";
import { UsersList } from "./UsersList.1";
import { UserVariationsType } from "../../types";
import { AppContext } from "../../contexts/AppContext";
import { users } from "../../const";
import "./Users.css";
import { Nav } from "react-bootstrap";

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
        <div className='users'>
            <div className="user-variation-tabs">
                {userTypes.map((type) => (
                    <Nav variant='tabs'>
                        <Nav.Item>
                            <Nav.Link className={type === usersType ? "active-tab" : "tab"} onClick={() => changeUserType(type)}>
                                {type.toUpperCase()}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                ))}
            </div>

            <UsersList users={usersType === "local" ? users : serverUsers} />
        </div>
    );
};
