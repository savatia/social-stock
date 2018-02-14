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
                            <h3>{routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={ () => (route.name)}
                                />
                            ))
                            }
                            </h3>
                        </div>
                        <ol className="breadcrumb navbar-text navbar-right no-bg">
                            <li className="current-parent">
                                <Link to={"/"} className="current-parent">
                                    <i className="fa fa-fw fa-home"/>
                                </Link>
                            </li>
                            <li>
                                <a href="javascript: void(0)">
                                    -
                                </a>
                            </li>
                            <li className="active">-</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div className="container page-wrapper">
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


    </div>
);

export default ContentWrapper;