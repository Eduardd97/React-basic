import React, { FC } from "react";
// import { Props, Users } from "../types";
import { UsersProps } from "../types";



export const UsersList: FC<UsersProps> = ({ users }) => {
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
