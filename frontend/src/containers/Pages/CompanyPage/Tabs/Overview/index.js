import React from 'react'
import TimeSeriesChart from 'src/components/TimeSeriesChart'

const Overview = ({company}) => {
    const chartData = company.stocks.edges.map((stock) => {
        return {
            value: stock.node.close,
            time: new Date(stock.node.date).getTime(),

        }
    });
    return (
        <TimeSeriesChart chartData={chartData}/>
    )
}

export default Overview;