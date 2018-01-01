import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import React from 'react';
import Sidebar from '../Sidebar';
import SidebarDropdown from '../SidebarDropdown';


const Navigation = ({}) => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        {/*<Nav>*/}
        {/*<NavItem eventKey={1} href="#">Link</NavItem>*/}
        {/*<NavItem eventKey={2} href="#">Link</NavItem>*/}

        {/*</Nav>*/}
        {/*<Nav pullRight>*/}
        {/*<NavItem eventKey={2} href="#">Link Right</NavItem>*/}
        {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">*/}
        {/*<MenuItem eventKey={3.1}>Action</MenuItem>*/}
        {/*<MenuItem eventKey={3.2}>Another action</MenuItem>*/}
        {/*<MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
        {/*<MenuItem divider/>*/}
        {/*<MenuItem eventKey={3.3}>Separated link</MenuItem>*/}
        {/*</NavDropdown>*/}
        {/*</Nav>*/}
        <div className="collapse nav navbar-collapse navbar-nav" id="navbarSupportedContent">
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
        </div>
        <Navbar.Collapse>
            <Sidebar>
                <NavItem eventKey={1} href="#">Side Link</NavItem>
                <NavItem eventKey={2} href="#">Side Link</NavItem>
                <SidebarDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </SidebarDropdown>
                 <NavItem eventKey={2} href="#">Side Link</NavItem>
            </Sidebar>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigation;
