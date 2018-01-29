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
    <div className="content-wrapper container-fluid">
        <div className="">

            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="#">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">My Dashboard</li>
            </ol>

            <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
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