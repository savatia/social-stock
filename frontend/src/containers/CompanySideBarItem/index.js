import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button} from 'react-bootstrap';
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';

import {
    createFragmentContainer,
    graphql
} from 'react-relay';



class CompanySideBarItem extends React.Component{
    render(){
        console.log("CompanySideBarItem")
        console.log(this.props)
        return (
            <MenuItem href={`/company/${this.props.company.symbol}`}>{ this.props.company.name }</MenuItem>
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
