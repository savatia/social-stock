import Highcharts from 'highcharts'
import theme from '../HighchartsTheme'

import React from 'react'
import moment from 'moment'


// Note that Highcharts has to be required separately
import ReactHighcharts from 'react-highcharts/ReactHighcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock';
import  HighchartsMore from 'highcharts-more';
import HighchartsExporting from 'highcharts-exporting';

const HighChartScatter = ({chartData, title, name, onDotClick}) => {
        var config = {
            xAxis: {
                gridLineWidth: 1,

            },


            title: {
                text: title
            },

            series: [{
                type: 'bubble',
                name: name,
                data: chartData,
                color: 'rgba(241, 196, 15,0.5)',
                tooltip: {
                    valueDecimals: 2
                },
                threshold: null,
                events: {
                    click: (e) => onDotClick(e.point.x)
                },
            }],

        };


        Object.assign(config, theme);

        HighchartsMore(ReactHighstock.Highcharts);
        // HighchartsExporting(ReactHighcharts.Highcharts);


        return ( <ReactHighstock config={config}/>);
    }
    ;


export default HighChartScatter;