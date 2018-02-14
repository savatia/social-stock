import React from 'react'
import TimeSeriesScatterChart from 'src/components/Charts/TimeSeriesScatterChart'
import moment from 'moment'
import Tweet from 'src/components/Tweet'
import HighChartScatter from 'src/components/Charts/HighChartScatter'

import {
    createRefetchContainer,
    createContainer,
    QueryRenderer,
    graphql
} from 'react-relay'
import environment from 'src/Environment.js';

class Sentiments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchDate: moment().format('Y-M-D'),
            tweets: props.tweets.tweets,
            loadingTweets: false
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.tweets != this.props.tweets) {
            console.log(nextProps)
            this.setState({loadingTweets: false, tweets: nextProps.tweets.tweets})
        }
    }


    render() {
        const chartData = this.props.company.sentiments.edges.map((stock) => {
            return [

                new Date(stock.node.date).getTime(),
                stock.node.retweetSentiment,
                stock.node.retweetVolume,
            ]
        });
        return (
            <div>
                <HighChartScatter onDotClick={this.handleDotClick} name={this.props.company.symbol}
                                  title={`Sentiments for ${this.props.company.name}`} chartData={chartData}/>
                <hr/>
                <h3>Tweets for { moment(this.state.searchDate).format('MMMM Do YYYY') }:</h3>
                <div className="timeline">
                    <div className="timeline-date">
                        <span className="badge">{ moment(this.state.searchDate).format('MMMM Do YYYY') }</span>
                    </div>
                </div>
                <br/>
                {this.state.loadingTweets ? <span>loading...</span> : this.state.tweets.map((tweet) => <Tweet
                        key={tweet.id} tweet={tweet}/>)}
            </div>
        )
    }

    handleDotClick = (data) => {
        this.setState({searchDate: moment(data).format('Y-M-D'), loadingTweets: true})
        this.props.relay.refetch(
            {symbol: this.props.company.symbol, date: moment(data).format('Y-M-D')},  // Our refetchQuery needs to know the `itemID`
            null,  // We can use the refetchVariables as renderVariables
            (props) => {
                console.log(props)
            },
            {force: true},  // Assuming we've configured a network layer cache, we want to ensure we fetch the latest data.
        );

    }
}

export default createRefetchContainer(
    Sentiments,
    graphql`
    fragment Sentiments_tweets on Query  @argumentDefinitions(
        date: { type: String },
        symbol: { type: String },
       ){
        tweets(date: $date, symbol: $symbol){
            id
            text
            date
            fullname
            replies
            likes
            retweets
            url
            user
            sentiment
        }
        
  
    }`,
    graphql`
     query SentimentsQuery ($symbol: String!, $date: String!) {
            ...Sentiments_tweets @arguments(date: $date, symbol: $symbol)
    }
  `
);