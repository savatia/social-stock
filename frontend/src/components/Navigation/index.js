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
                            <button className="action-right-sidebar-toggle navbar-toggle collapsed" data-target="#navdbar"
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

                            <li className="Dashboards nested-active primary-submenu has-submenu expanded">
                                <a href="javascript: void(0)" title="Dashboards">
                                    <i className="fa fa-home fa-lg fa-fw"/><span className="nav-label">Start</span>
                                    <i className="fa arrow"/>
                                </a>
                                <ul className="submenu-level-1">
                                    <li className="">
                                        <a href="../start/financial.html">
                                            <span className="nav-label">Financial</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/projects.html">
                                            <span className="nav-label">Projects</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/monitor.html">
                                            <span className="nav-label">Monitor</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/system.html">
                                            <span className="nav-label">System</span>
                                        </a>
                                    </li>
                                    <li className="active nested-active expanded">
                                        <a href="../start/activity-team.html">
                                            <span className="nav-label">Activity Team</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/e-commerce.html">
                                            <span className="nav-label">E-Commerce</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/stock.html">
                                            <span className="nav-label">Stock</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/performance.html">
                                            <span className="nav-label">Performance</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/exchange&amp;trading.html">
                                            <span className="nav-label">Exchange &amp; Trading</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/overview.html">
                                            <span className="nav-label">Overview</span>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="../start/analytics.html">
                                            <span className="nav-label">Analytics</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>


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
