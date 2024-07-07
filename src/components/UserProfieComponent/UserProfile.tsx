import React, { FC } from "react";
import { Card } from "react-bootstrap";
import './UserProfile.css'

type Props = {
    user?: {
        email: string;
        password: string;
        name: string;
        age: number;
    };
};

export const UserProfile: FC<Props> = ({ user }) => {
    if (!user) return <h1>There is no user passed</h1>;

    const { email, name, age } = user;
    return (
        <div className="user-profile">
            <Card border='primary' style={{ width: "30rem", height: "15rem" }}>
                <Card.Header>Name: {name}</Card.Header>
                <Card.Body>
                    <Card.Title>Email: {email}</Card.Title>
                    <Card.Text>Age: {age}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};
