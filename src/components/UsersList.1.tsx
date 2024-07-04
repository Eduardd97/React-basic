import React, { FC, useContext } from "react";
import { UsersProps } from "../types";
import { Button, Card } from "react-bootstrap";
import { AppContext } from "../contexts/AppContext";
// import { client } from "../axios";

export const UsersList: FC<UsersProps> = ({ users }) => {
    // useEffect(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //     client
    // }, [])

    const { deleteUser } = useContext(AppContext);

    return (
        <div>
            <h2>List of Users</h2>
            <ul>
                {users.map((user, index) => (
                    <Card
                        key={index}
                        className='mt-3'
                        style={{ width: "18rem" }}
                    >
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>
                                {user.email}
                            </Card.Subtitle>
                        </Card.Body>
                        <Card.Footer>
                            {!("age" in user) && (
                                <Button
                                    variant='danger'
                                    onClick={() =>
                                        deleteUser && deleteUser(user)
                                    }
                                >
                                    Delete
                                </Button>
                            )}
                        </Card.Footer>
                    </Card>
                ))}
            </ul>
        </div>
    );
};
