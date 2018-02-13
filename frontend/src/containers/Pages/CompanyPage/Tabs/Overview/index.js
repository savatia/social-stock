import React from 'react'
import TimeSeriesLineChart from 'src/components/Charts/TimeSeriesLineChart'

const Overview = ({company}) => {
    const chartData = company.stocks.edges.map((stock) => {
        return {
            value: stock.node.close,
            time: new Date(stock.node.date).getTime(),

        }
    });
    return (
        <TimeSeriesLineChart chartData={chartData}/>
    )
}

export default Overview;