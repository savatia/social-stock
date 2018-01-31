import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import React from 'react';
import Sidebar from '../Sidebar';
import SidebarDropdown from '../SidebarDropdown';
import CompanySidebarItem from 'src/containers/CompanySideBarItem';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom'
import {
    createFragmentContainer,
    graphql
} from 'react-relay';

class Navigation extends React.Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Social Stock</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <div className="collapse nav navbar-collapse navbar-nav" id="navbarSupportedContent">
                    <NavItem eventKey={1} href="#">Link</NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">

                    </NavDropdown>
                </div>
                <Navbar.Collapse>
                    <Sidebar>
                        <LinkContainer exact to="/">
                            <NavItem eventKey={1}>Home</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/stocks">
                            <NavItem eventKey={2}>Stocks</NavItem>
                        </LinkContainer>

                        <SidebarDropdown eventKey={3} title="Companies" id="basic-nav-dropdown">
                            {
                                this.props.companies.companies.edges.map((node) => (
                                    <CompanySidebarItem key={node.cursor} company={node.node}/>
                                ))
                            }
                        </SidebarDropdown>
                        <NavItem eventKey={2} href="#">Side Link</NavItem>
                    </Sidebar>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default createFragmentContainer(Navigation, graphql`
    fragment Navigation_companies on Viewer {
        companies(last: 10) {
            edges{
                node{
                 ...CompanySideBarItem_company
                } 
                cursor
            }
            pageInfo{
                hasPreviousPage
                startCursor
            }
        }
    }
`);
