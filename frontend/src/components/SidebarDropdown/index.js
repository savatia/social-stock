import {NavDropdown} from 'react-bootstrap';
import React, {Component} from 'react';

export default class SidebarDropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {expanded: false};
    }

    toggleExpand = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
        return (
            <li className={`dropdown ${this.state.expanded? "open" : "" }` }>
                <a id="basic-nav-dropdown" role="button" className="dropdown-toggle" onClick={this.toggleExpand} aria-haspopup="true" aria-expanded={ this.state.expanded? "true": "false"} href="#">
                    {this.props.title}
                    <span className="caret"/>
                </a>
                <ul role="menu" className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
                    {this.props.children}
                </ul>
            </li>
        )
    }
}