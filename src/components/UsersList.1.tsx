import React, { FC, useEffect } from "react";
import { UsersProps } from "../types";
import { client } from "../axios";



export const UsersList: FC<UsersProps> = ({ users }) => {

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        client
    }, [])

    return (
        <div>
            <h2>List of Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Email: {user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
