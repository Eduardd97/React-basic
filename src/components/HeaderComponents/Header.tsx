import React from "react";
import "./Header.css";
import "./Mobile.css";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
    const headerRoutes = [
        { title: "Login page", path: "/login" },
        // { title: "Counter page", path: "/counter" },
        { title: "User Profile", path: "user-profile" },
        { title: "Local Users List", path: "/users-list" },
        { title: "Users", path: "/users" },
        { title: "Todos", path: "/todos" },
        { title: "User Create", path: "/user-create" },
        { title: "Posts List", path: "/posts" },
    ];

    return (
        <Navbar expand='lg' className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href='/'>Users dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {headerRoutes.map((route) => (
                            <Nav.Link key={route.title} href={route.path}>
                                {route.title}
                            </Nav.Link>
                        ))}

                        {/* <Nav.Link href='#home'>Home</Nav.Link>
                        <Nav.Link href='#link'>Link</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
