import React, { FC, useContext } from "react";
import { UsersProps } from "../../types";
import { Button, Card, InputGroup } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContext";
import "./Users.css";
import "./MobileUsers.css"
import { useNavigate } from "react-router-dom";

export const UsersList: FC<UsersProps> = ({ users }) => {
    // useEffect(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //     client
    // }, [])
    const navigate = useNavigate()

    const { deleteUser } = useContext(AppContext);

    const redirectToEditForm = (email: string) => {
            navigate(`/user-create/${email}`);
    }

    return (
        <div className='users-list'>
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
                            )}{" "}
                            {!("age" in user) && (
                                <InputGroup.Checkbox onChange={() => redirectToEditForm(user.email)}></InputGroup.Checkbox>
                            )}{" "}
                            {!("age" in user) && <span className="title-checkbox">Edit User</span>}
                        </Card.Footer>
                    </Card>
                ))}
            </ul>
        </div>
    );
};
