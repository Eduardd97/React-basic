import React, { FormEventHandler, useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { APIUserType } from "../../types";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export const UserForm = () => {
    const { createUser, editUser } = useContext(AppContext);

    const { email } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(email);

    const initialState = {
        email: "",
        phone: "",
        name: "",
    };

    const [userData, setUserData] = useState<APIUserType>(initialState);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (isEditMode && email) {
            editUser && editUser(email, userData);
        } else {
            createUser && createUser(userData);
            
        }
        setUserData(initialState); // added logic to clear data after creating a new user

        navigate('/users');
    };

    return (
        <Container>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={userData.name}
                        onChange={(event) =>
                            setUserData({
                                ...userData,
                                name: event.target.value,
                            })
                        }
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        value={userData.phone}
                        onChange={(event) =>
                            setUserData({
                                ...userData,
                                phone: event.target.value,
                            })
                        }
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        value={userData.email}
                        onChange={(event) =>
                            setUserData({
                                ...userData,
                                email: event.target.value,
                            })
                        }
                    />

                    <Button type='submit'>Create User</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};
