import React from 'react'
import HighStockTimeSeries from 'src/components/Charts/HighStockTimeSeries'

const Overview = ({company}) => {
    const chartData = company.stocks.edges.map((stock) => {
        return [
            new Date(stock.node.date).getTime(),
            stock.node.close,


        ]
    });
    return (
        <HighStockTimeSeries chartData={chartData} title={`${company.name} Stock Price`} name={company.symbol}/>
    )
}

export default Overview;