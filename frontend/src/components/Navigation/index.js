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
            <nav className="navigation">
                <div className="navbar-inverse navbar navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link id="logo" className="current navbar-brand" to={"/"}>
                                <i className="fa fa-bar-chart fa-lg fa-fw"/>&nbsp;
                                Social Stock
                            </Link>
                            <button className="action-right-sidebar-toggle navbar-toggle collapsed"
                                    data-target="#navdbar"
                                    data-toggle="collapse" type="button" data-original-title="" title="">
                                <i className="fa fa-fw fa-align-right text-white"/>
                            </button>
                            <button className="navbar-toggle collapsed" data-target="#navbar" data-toggle="collapse"
                                    type="button">
                                <i className="fa fa-fw fa-user text-white"/>
                            </button>
                            <button className="action-sidebar-open navbar-toggle collapsed" type="button">
                                <i className="fa fa-fw fa-bars text-white"/>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar"></div>
                    </div>
                </div>

                <aside className="navbar-default sidebar affix-top ps-container ps-theme-default">
                    <div className="sidebar-logo">
                        <Link to={"/"}> Social Stock Prediction</Link>
                    </div>
                    <div className="sidebar-default-visible text-muted small text-uppercase sidebar-section p-y-2">
                        <strong>Navigation</strong>
                    </div>
                    <div className="sidebar-content">
                        <ul className="side-menu">
                            <LinkContainer activeClassName={"active"} exact to={`/`}>
                                <MenuItem><i className="fa fa-home fa-lg fa-fw"/> <span className="nav-label">Home</span></MenuItem>
                            </LinkContainer>
                            <li className="Dashboards nested-active primary-submenu has-submenu expanded">
                                <a href="javascript: void(0)" title="Dashboards">
                                    <i className="fa fa-line-chart fa-lg fa-fw"/><span
                                    className="nav-label">Stocks</span>
                                    <i className="fa arrow"/>
                                </a>
                                <ul className="submenu-level-1">
                                    {
                                        this.props.companies.companies.edges.map((node) => (
                                            <CompanySidebarItem key={node.cursor} company={node.node}/>
                                        ))
                                    }

                                </ul>
                            </li>
                            <LinkContainer exact to={`#`}>
                                <MenuItem><i className="fa fa-smile-o fa-lg fa-fw"/> <span className="nav-label">Sentiment Analysis</span></MenuItem>
                            </LinkContainer>


                        </ul>
                    </div>

                </aside>
            </nav>
        );
    }
}

export default createFragmentContainer(Navigation, graphql`
    fragment Navigation_companies on Viewer {
        companies(last: 10, published: true) {
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
