import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { APIUserType, UsersProps } from "../../types";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContext";
import "./Users.css";
import "./MobileUsers.css";
import { useNavigate } from "react-router-dom";

export const UsersList: FC<UsersProps> = ({ users }) => {
    // useEffect(() => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //     client
    // }, [])
    const navigate = useNavigate();

    const { deleteUser, searchUser } = useContext(AppContext);

    // useEffect(() => {
    //     if (UserIsNotFound.current) {
    //         UserIsNotFound.current.textContent = "User not found for this email address";
    //     }
    // }, []);
    
    const [email, setEmail] = useState("");
    const [foundUser, setFoundUser] = useState<APIUserType | null>(null);

    const hideUsers = useRef<HTMLUListElement | null>(null);
    const hideUser = useRef<HTMLDivElement | null>(null);

    const handleSearch = () => {
        if (searchUser) {
            const user = searchUser(email);
            setFoundUser(user);
            if (hideUsers.current) hideUsers.current.style.display = "none";

            navigate(`/users/${email}`);
            // if (hideUsers.current) hideUsers.current.style.display = "none";
        }
    };

    useEffect(() => {
        if (window.location.pathname === "/users") {
            // При возврате к списку пользователей
            if (hideUsers.current) hideUsers.current.style.display = "grid"; // Показываем список пользователей
            if (hideUser.current) hideUser.current.style.display = "none";
        }
    }, [navigate]);

    const redirectToEditForm = (email: string) => {
        navigate(`/user-create/${email}`);
    };



    const divRef = useRef<HTMLDivElement | null>(null);

    // const userDataRef = useRef({ name: "Eduard" });
    // console.log(userDataRef, "userDataRef");

    // console.log(divRef.current?.innerHTML, "divRef");

    // const UserIsNotFound = useRef<HTMLDivElement | null>(null);
    // // UserIsNotFound.current?.textContent = "a"

    return (
        <div className='users-list' ref={divRef}>
            <h2>List of Users</h2>

            <InputGroup className='search-user-input mb-3'>
                <Form.Control
                    placeholder="Enter the user's email address"
                    aria-label="Enter the user's email address"
                    aria-describedby='basic-addon2'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <Button
                    variant='outline-secondary'
                    id='button-addon2'
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </InputGroup>

            <ul ref={hideUsers}>
                {users.map((user, index) => (
                    <Card
                        key={`${user.email}-${index}`}
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
                                <InputGroup.Checkbox
                                    onChange={() =>
                                        redirectToEditForm(user.email)
                                    }
                                ></InputGroup.Checkbox>
                            )}{" "}
                            {!("age" in user) && (
                                <span className='title-checkbox'>
                                    Edit User
                                </span>
                            )}
                        </Card.Footer>
                    </Card>
                ))}
            </ul>

            {foundUser ? (
                <Card
                    key={`${email}-${Math.floor(Math.random() * email.length)}`}
                    className='user-found mt-3'
                    style={{ width: "18rem" }}
                    ref={hideUser}
                >
                    <Card.Body>
                        <Card.Title>{foundUser.name}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>
                            {foundUser.email}
                        </Card.Subtitle>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant='danger'
                            onClick={() => deleteUser && deleteUser(foundUser)}
                        >
                            Delete
                        </Button>{" "}
                        <InputGroup.Checkbox
                            onChange={() => redirectToEditForm(foundUser.email)}
                        />{" "}
                        <span className='title-checkbox'>Edit User</span>
                    </Card.Footer>
                </Card>
            ) : (
                email && <div>User not found for this email address</div>
            )}
        </div>
    );
};
