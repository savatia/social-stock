import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import React, {Component} from 'react';

const Sidebar = ({children}) => (
    <Nav className="side-nav">
        {children}
    </Nav>
);

export default Sidebar;