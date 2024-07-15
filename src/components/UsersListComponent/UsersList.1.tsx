import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { APIUserType, UsersProps } from "../../types";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContext";
import "./Users.css";
import "./MobileUsers.css";
import { useNavigate } from "react-router-dom";

export const UsersList: FC<UsersProps> = ({ users }) => {
    const navigate = useNavigate();
    const { deleteUser, searchUser } = useContext(AppContext);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [searchByEmail, setSearchByEmail] = useState(false);
    const [searchByName, setSearchByName] = useState(false);
    const [foundUser, setFoundUser] = useState<APIUserType | null>(null);

    const hideUsers = useRef<HTMLUListElement | null>(null);
    const hideUser = useRef<HTMLDivElement | null>(null);

    const handleSearch = () => {
        if (searchUser) {
            let user: APIUserType | null = null;

            if (searchByEmail && email) {
                user = searchUser(email, "");
                navigate(`/users/${email.toLowerCase()}`);
            } else if (searchByName && name) {
                user = searchUser("", name);
                navigate(`/users/${name.split(' ').join('-').toLowerCase()}`);
            } else {
                user = searchUser(email, name);
                navigate(`/users/${email.split(' ').join('-').toLowerCase() || name.split(' ').join('-').toLowerCase()}`);
            }

            setFoundUser(user);

            if (hideUsers.current) hideUsers.current.style.display = "none";

        }
    };

    useEffect(() => {
        if (window.location.pathname === "/users") {
            if (hideUsers.current) hideUsers.current.style.display = "grid";
            if (hideUser.current) hideUser.current.style.display = "none";
        }
    }, [navigate]);

    const redirectToEditForm = (email: string) => {
        navigate(`/user-create/${email}`);
    };

    return (
        <div className='users-list'>
            <h2>List of Users</h2>

            <InputGroup className='search-user-input mb-3'>
                <InputGroup.Checkbox
                    checked={searchByEmail}
                    onChange={() => {
                        setSearchByEmail(!searchByEmail);
                        if (searchByName) setSearchByName(false);
                    }}
                    aria-label='Checkbox for searching by email'
                />
                <span className='input-email'>Email</span>
                <InputGroup.Checkbox
                    checked={searchByName}
                    onChange={() => {
                        setSearchByName(!searchByName);
                        if (searchByEmail) setSearchByEmail(false);
                    }}
                    aria-label='Checkbox for searching by name'
                />
                <span className='input-name'>Name</span>
                <Form.Control
                    placeholder="Enter the user's email address or name"
                    aria-label="Enter the user's email address or name"
                    aria-describedby='basic-addon2'
                    value={searchByEmail ? email : name}
                    onChange={(event) => {
                        if (searchByEmail) {
                            setEmail(event.target.value);
                        }
                        if (searchByName) {
                            setName(event.target.value);
                        } else {
                            // Устанавливаем оба значения, если ни один чекбокс не выбран
                            setEmail(event.target.value);
                            setName(event.target.value);
                        }
                    }}
                    // disabled={!searchByEmail && !searchByName}
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
                                    onClick={() => deleteUser && deleteUser(user)}
                                >
                                    Delete
                                </Button>
                            )}
                            {!("age" in user) && (
                                <InputGroup.Checkbox
                                    onChange={() => redirectToEditForm(user.email)}
                                />
                            )}
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
                    key={foundUser.email}
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
                (email || name) && <div>User not found for this email address or name</div>
            )}
        </div>
    );
};
