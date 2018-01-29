import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

import {
    createFragmentContainer,
    graphql
} from 'react-relay';



class CompanySideBarItem extends React.Component{
    render(){
        return (
            <LinkContainer to={`/company/${this.props.company.symbol}`}>
                 <MenuItem>{ this.props.company.name }</MenuItem>
            </LinkContainer>

        )
    }
}

export default createFragmentContainer(CompanySideBarItem, graphql`
    fragment CompanySideBarItem_company on CompanyNode {
        id
        name
        symbol
    }
`)
