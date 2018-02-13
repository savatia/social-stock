import React from 'react'
import TimeSeriesScatterChart from 'src/components/Charts/TimeSeriesScatterChart'
import moment from 'moment'
import Tweet from 'src/components/Tweet'

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
            return {
                sentiment: stock.node.retweetSentiment,
                volume: stock.node.retweetVolume,
                time: new Date(stock.node.date).getTime(),
            }
        });
        return (
            <div>
                <TimeSeriesScatterChart onDotClick={this.handleDotClick} chartData={chartData}/>
                <hr/>
                <h3>Tweets for { moment(this.state.searchDate).format('MMMM Do YYYY') }:</h3>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="small text-muted text-uppercase">
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.loadingTweets ? <tr>loading...</tr> : this.state.tweets.map((tweet) => <Tweet
                            key={tweet.id} tweet={tweet}/>)}
                    </tbody>
                </table>


            </div>
        )
    }

    handleDotClick = (data) => {
        this.setState({searchDate: moment(data.time).format('Y-M-D'), loadingTweets: true})
        console.log(data);
        this.props.relay.refetch(
            {symbol: this.props.company.symbol, date: moment(data.time).format('Y-M-D')},  // Our refetchQuery needs to know the `itemID`
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