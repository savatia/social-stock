import React from 'react'
import moment from 'moment'
import {Glyphicon} from 'react-bootstrap'


const Tweet = ({tweet}) => {
    return (
        <div className="timeline">
            <div className="timeline-item p-r-1">
                <div className="timeline-icon">
                    {
                        (tweet.sentiment === "pos") ? (
                                 <i className="fa fa-fw fa-smile-o text-success"/>
                            ) :
                            (
                                <i className="fa fa-fw  fa-frown-o text-danger"/>
                            )
                    }

                </div>
                <div className="timeline-item-head clearfix m-b-0">
                    <div className="row">

                        <div className="col-lg-4">
                            <div className="media m-l-1">
                                <div className="media-left media-top">
                                    <a hhref={`//twiter.com/${tweet.user}`} target="_blank" data-toggle="tooltip"
                                       data-placement="top" title="" data-original-title="Go to Full Profile">
                                        <div className="avatar"><img className="media-object img-circle" alt="Avatar"
                                                                     src={`https://twitter.com/${tweet.user}/profile_image?size=bigger`}/>
                                            <i className="avatar-status avatar-status-bottom bg-success b-brand-gray-darker"/>
                                        </div>
                                    </a>
                                </div>
                                <div className="media-body">
                                    <h5 className="m-t-0 m-b-0"><span>{tweet.fullname}</span></h5>
                                    <p className="m-t-0"><span> <a href={`//twiter.com/${tweet.user}`}
                                                                   target="_blank">@{tweet.user}</a></span></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="m-l-1"><span>{tweet.text}</span>
                                <br/>
                                <span className="hidden-lg"> <small><span>
                                                    <a className="list-unstyled" target="_blank"
                                                       href={`https://twitter.com/${tweet.user}/status/${tweet.id}`}>
                                                        {moment(tweet.date).format('MMM D YYYY')}
                                                        </a>
                                                </span>
                                                </small>
                                                </span>
                            </div>
                        </div>

                        <div className="col-lg-2 text-right hidden-md hidden-sm hidden-xs">
                            <span>{moment(tweet.date).format('MMM D YYYY')}</span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tweet