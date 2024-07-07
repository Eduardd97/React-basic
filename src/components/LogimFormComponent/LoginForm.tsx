import React, { FC, FormEventHandler, useState } from "react";
import "./LoginForm.css";
import { Button, Col, Form, Row } from "react-bootstrap";

type Props = {
    email: string;
    password: string;
};

export const LoginForm: FC<Props> = () => {
    const initialState = { email: "email@example.com", password: "" };
    // two-way-binding

    // const [email, setEmail] = useState("");

    // const [password, setPassword] = useState("");

    const [formData, setFormData] = useState(initialState);

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log("Email", `${formData.email}`);
        console.log("Paswword", `${formData.password}`);
        setFormData(initialState);
    };

    // console.log(email);

    return (
        <div className='login-form'>
            <Form onSubmit={onSubmit}>
                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formPlaintextEmail'
                >
                    <Form.Label column sm='2'>
                        Email
                    </Form.Label>
                    <Col sm='10'>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    email: event.target.value,
                                })
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group
                    as={Row}
                    className='mb-3'
                    controlId='formPlaintextPassword'
                >
                    <Form.Label column sm='2'>
                        Password
                    </Form.Label>
                    <Col sm='10'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    password: event.target.value,
                                })
                            }
                        />
                    </Col>
                </Form.Group>
                <Button type='submit'>Submit</Button>
            </Form>

            {/* <input
                type='text'
                placeholder='email'
                value={formData.email}
                onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                }
            />
            <input
                type='password'
                placeholder='password'
                value={formData.password}
                onChange={(event) =>
                    setFormData({ ...formData, password: event.target.value })
                }
            />
            <button onClick={onSubmit}>Submit</button> */}
        </div>
    );
};
