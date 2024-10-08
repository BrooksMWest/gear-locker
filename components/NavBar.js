/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Gear Locker</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/allGear">
              <Nav.Link>All Gear</Nav.Link>
            </Link>
            <Link passHref href="/currentGear">
              <Nav.Link>Current Gear</Nav.Link>
            </Link>
            <Link passHref href="/archivedGear">
              <Nav.Link>Archived Gear</Nav.Link>
            </Link>
            <Link passHref href="/gearSummary">
              <Nav.Link>Gear Summary</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
