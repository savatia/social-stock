import React from 'react'
import moment from 'moment'
import {Glyphicon} from 'react-bootstrap'


const Tweet = ({tweet}) => {
    return (
        <tr>
            <td>
                <div className="media media-auto">
                    <div className="media-left">
                        <a href={`//twiter.com/${tweet.user}`} target="_blank">
                            <img className="media-object img-circle" style={{width: 35}}
                                 src={`https://twitter.com/${tweet.user}/profile_image?size=bigger`}
                                 alt="Avatar"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <div className="col-md-12">
                            <div className="row">
                                <span className="media-heading text-white">
                                    <a href={`//twiter.com/${tweet.user}`} target="_blank">{tweet.fullname}</a>
                                </span>
                            </div>
                            <div className="row"><span className="text-muted">@{tweet.user}</span>&nbsp;
                                <span className="media-heading">
                                    <span>&nbsp;on&nbsp;
                                        <a className="list-unstyled" target="_blank"
                                           href={`https://twitter.com/${tweet.user}/status/${tweet.id}`}>
                                            {moment(tweet.date).format('MMM D YYYY')}
                                        </a>
                                    </span>
                                </span>
                            </div>

                        </div>
                        <br />

                        <p className="m-t-2 m-b-0"><span>{tweet.text}</span></p>
                        <ul className="tweet-icons list-unstyled list-inline ">
                            <li className="list-inline-item">
                                <Glyphicon glyph="star"><span
                                    className="tweet-icons-text tweet-icons-text-likes">{tweet.likes}</span></Glyphicon>
                            </li>
                            <li className=" list-inline-item">
                                <Glyphicon glyph="retweet"><span
                                    className="tweet-icons-text tweet-icons-text-retweets">{tweet.retweets}</span></Glyphicon>
                            </li>
                        </ul>

                    </div>
                    {
                        (tweet.sentiment === "pos") ? (
                                <div className="tweet-sentiment alert-success media-right">
                                    <i className="fa fa-smile-o"/>
                                </div>
                            ) :
                            (
                                <div className="tweet-sentiment alert-danger media-right">
                                    <i className="fa fa-frown-o"/>
                                </div>
                            )
                    }

                </div>
            </td>
        </tr>
    )
}

export default Tweet