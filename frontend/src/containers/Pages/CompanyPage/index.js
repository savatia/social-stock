import React from 'react'
import {Panel} from 'react-bootstrap'
import {Line} from 'react-chartjs'
import TimeSeriesChart from 'src/components/TimeSeriesChart'

import {
    createContainer,
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from 'src/Environment.js';

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
            stocks{
                edges{
                    node{
                        date
                        close
                    }
                }
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
                        const chartData = props.company.stocks.edges.map((stock) => {
                            return {
                                value: stock.node.close,
                                time: new Date(stock.node.date).getTime(),

                            }
                        });

                        return (
                            <Panel>
                                <h1>{props.company.name}<span
                                    className="small text-muted">({props.company.symbol})</span></h1>
                                <h5><span className="text-muted">{props.company.subSector.name}</span></h5>
                                <TimeSeriesChart chartData={chartData}/>
                            </Panel>
                        )
                    }
                    return <div>Loading</div>
                }}/>

        )
    }
}
