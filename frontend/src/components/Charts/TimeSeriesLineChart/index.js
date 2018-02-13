import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

const TimeSeriesLineChart = ({chartData}) => (
    <ResponsiveContainer width='95%' height={500}>
        <LineChart data={chartData}>
            <XAxis
                dataKey='time'
                tickCount={10}
                domain={['auto', 'auto']}
                name='Time'
                tickFormatter={(unixTime) => moment(unixTime).format('MMM D Y')}
                type='number'
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
            <YAxis name="Closing Price"/>
            <Tooltip  labelFormatter={(unixTime) => moment(unixTime).format('MMM D Y')}/>
            <Line dot={false} type="monotone" name={"Closing Price"} dataKey="value" stroke="#2d99dc"
            />

        </LineChart>
    </ResponsiveContainer>
)

TimeSeriesLineChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            time: PropTypes.number,
            value: PropTypes.number
        })
    ).isRequired
}

export default TimeSeriesLineChart