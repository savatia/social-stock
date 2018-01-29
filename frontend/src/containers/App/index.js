import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';
import CompanyList from '../CompanyList';
import CompanySideBarItem from '../CompanySideBarItem';


import {
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from '../../Environment.js';

const AppAllQuery = graphql`
    query AppAllQuery {
        viewer{ 
            ...Navigation_companies
         }
    }
`;


class App extends React.Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={AppAllQuery}
                render={({error, props}) => {
                    if (error) {
                        return <div>{error.message}</div>
                    }
                    else if (props) {
                        return [
                            <Navigation key="1" companies={props.viewer}/>,
                            <ContentWrapper key="2"/>,
                        ]
                    }
                    return <div>Loading</div>
                }}
            />

        );
    }
}
export default App;