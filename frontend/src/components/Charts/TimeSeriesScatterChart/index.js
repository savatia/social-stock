import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis,
} from 'recharts'

const TimeSeriesChart = ({chartData, onDotClick}) => (
    <ResponsiveContainer width='95%' height={500}>
        <ScatterChart>
            <XAxis
                dataKey='time'
                tickCount={10}
                domain={['auto', 'auto']}
                name='Time'
                tickFormatter={(unixTime) => moment(unixTime).format('MMM D Y')}
                type='number'
            />
            <Tooltip
                content={({payload}) => {
                    return (
                        <div style={{color: "#000000", backgroundColor: "#ffffff"}} className="custom-tooltip">
                            {payload.map(function (object, i) {
                                return (<p key={object.name}>
                                    {object.name}: {(() => {
                                        if(object.name == "Time"){
                                            return  moment(object.value).format('MMM D Y')
                                        }
                                        else {
                                            return object.value
                                        }
                                    })()}
                                </p>)
                            })}
                        </div>
                    )
                }
                }
                labelFormatter={(unixTime) => moment(Time).format('MMM D Y') }/>
            <CartesianGrid stroke="#ccc" strokeDasharray="2 2"/>
            <YAxis dataKey={'sentiment'} name="Sentiment"/>
            <ZAxis dataKey={'volume'} range={[1, 1000]} name="Volume"/>
            <Scatter onClick={ onDotClick}  data={chartData} name={"Sentiment"} fill='#55cb3e4b'
            />

        </ScatterChart>
    </ResponsiveContainer>
)

TimeSeriesChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.number,
            value: PropTypes.number
        })
    ).isRequired,
    onDotClick: PropTypes.func
}

export default TimeSeriesChart