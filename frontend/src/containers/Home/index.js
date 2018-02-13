import ContentWrapper from '../../components/ContentWrapper';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';
import HighStockTimeSeries from 'src/components/Charts/HighStockTimeSeries'

import React from 'react';

export default class Home extends React.Component{
    render(){
        return (
            <HighStockTimeSeries/>

        );
    }
}