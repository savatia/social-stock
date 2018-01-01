import ContentWrapper from '../../components/ContentWrapper';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';

import React from 'react';

export default class App extends React.Component{
    render(){
        return (
            [
                <Navigation/>,
                <ContentWrapper/>
            ]
        );
    }
}