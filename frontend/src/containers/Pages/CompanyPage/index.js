import React from 'react'
import {Panel} from 'react-bootstrap'

import {
    createContainer,
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from '../../../Environment.js';

const CompanyPageQuery = graphql`
    query CompanyPageQuery ($symbol: String!) {
        company(symbol: $symbol){
            id
            name
            symbol
            subSector{
                id
                name
            }
        }
    }
`;

export default class CompanyPage extends React.Component {
    render() {
        return (

            <QueryRenderer
                environment={environment}
                query={CompanyPageQuery}
                variables={{
                    symbol: this.props.match.params.companySymbol
                }}
                render={({error, props}) => {
                    if (error) {
                        return <div>{error.message}</div>
                    }
                    else if (props) {
                        console.log(props);
                        return (
                            <Panel>
                                <h1>{props.company.name}</h1>
                            </Panel>
                        )
                    }
                    return <div>Loading</div>
                }}
            />

        )
    }
}
