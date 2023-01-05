import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/images/order.png"
                        width="250"
                        height="auto"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/items">All items</Nav.Link>
                    <Nav.Link href="/items/create">Create item</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;