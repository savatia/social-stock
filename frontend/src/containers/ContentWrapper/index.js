import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import routes from '../../routes/routes';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';

const ContentWrapper = () => (
    <div className="content content-wrapper container-fluid">


        <div className="sub-navbar sub-navbar__header-breadcrumbs">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 sub-navbar-column">
                        <div className="sub-navbar-header">
                            <h3>Activity Team</h3>
                        </div>
                        <ol className="breadcrumb navbar-text navbar-right no-bg">
                            <li className="current-parent">
                                <a className="current-parent" href="../index.html">
                                    <i className="fa fa-fw fa-home"/>
                                </a>
                            </li>
                            <li>
                                <a href="javascript: void(0)">
                                    Start
                                </a>
                            </li>
                            <li className="active">Activity Team</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-xl-12 col-sm-12">
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))
                }
            </div>
        </div>

    </div>
);

export default ContentWrapper;