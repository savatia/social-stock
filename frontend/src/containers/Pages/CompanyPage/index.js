import React from 'react'
import {Panel, Tab, Tabs, Row, Col, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {Line} from 'react-chartjs'
import {LinkContainer} from 'react-router-bootstrap';
import moment from 'moment'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'

import {
    createContainer,
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from 'src/Environment.js';
import {Sentiments, Overview, Predictions} from 'src/containers/Pages/CompanyPage/Tabs'

const CompanyPageQuery = graphql`
    query CompanyPageQuery ($symbol: String!, $date: String!) {
        ...Sentiments_tweets  @arguments(date: $date, symbol: $symbol)
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
            sentiments{
                edges{
                    node{
                        date
                        retweetVolume
                        retweetSentiment
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
                    symbol: this.props.match.params.companySymbol, date: moment().format('Y-M-D')
                }}
                render={({error, props}) => {
                    if (error) {
                        return <div>{error.message}</div>
                    }
                    else if (props) {
                        return (
                            <Panel>
                                <h1>{props.company.name}<span
                                    className="small text-muted">({props.company.symbol})</span></h1>
                                <h5><span className="text-muted">{props.company.subSector.name}</span></h5>
                                <Tab.Container id="companyPageTab">
                                    <Row className="clearfix">
                                        <Col sm={12}>
                                            <Nav bsStyle="tabs">
                                                <LinkContainer exact to={`/company/${props.company.symbol}`}>
                                                    <NavItem>Overview</NavItem>
                                                </LinkContainer>
                                                <LinkContainer to={`/company/${props.company.symbol}/sentiments`}>
                                                    <NavItem>Sentiments</NavItem>
                                                </LinkContainer>
                                                <LinkContainer to={`/company/${props.company.symbol}/predictions`}>
                                                    <NavItem>Predictions</NavItem>
                                                </LinkContainer>
                                            </Nav>
                                        </Col>
                                        <Col sm={12}>
                                            <Tab.Content animation>
                                                <Switch>
                                                    <Route exact path="/company/:companySymbol"
                                                           component={() => {
                                                               return <Overview company={props.company}/>
                                                           }}/>
                                                    <Route path="/company/:companySymbol/sentiments"
                                                           component={() => {
                                                              return <Sentiments tweets={props} company={props.company}/>
                                                           }}/>
                                                    <Route path="/company/:companySymbol/predictions"
                                                           component={() => {
                                                               return <Predictions company={props.company}/>
                                                           }}/>
                                                    <Route component={() => {
                                                               return "Not Found"
                                                           }}/>
                                                </Switch>


                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container>
                            </Panel>
                        )
                    }
                    return <div>Loading</div>
                }}/>

        )
    }
}
