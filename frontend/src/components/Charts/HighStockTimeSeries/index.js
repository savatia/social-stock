import Highcharts from 'highcharts'
import theme from '../HighchartsTheme'

import React from 'react'
import moment from 'moment'


// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock';

const HighStockTimeSeries = ({chartData, title, name}) => {
        var config = {
            rangeSelector: {
                selected: 1
            },
            title: {
                text: title
            },
            series: [{
                name: name,
                data: chartData,
                tooltip: {
                    valueDecimals: 2
                },
                type: 'area',
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgba(45, 153, 220, .1)'],
                        [1, 'rgba(45, 153, 220, 0)']
                    ]
                },
                threshold: null


            }],


        };

        Object.assign(config, theme);

        return ( <ReactHighstock config={config}/>);
    }
    ;


export default HighStockTimeSeries;