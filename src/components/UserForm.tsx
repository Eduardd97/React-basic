import React, { FormEventHandler, useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { APIUserType } from "../types";
import { AppContext } from "../contexts/AppContext";

export const UserForm = () => {
    const { createUser } = useContext(AppContext);
    const [userData, setUserData] = useState<APIUserType>({
        email: "",
        phone: "",
        name: "",
    });

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        createUser && createUser(userData)
    }

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