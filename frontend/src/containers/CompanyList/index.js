import React, { Component} from 'react';
import {
    createFragmentContainer,
    graphql
} from 'react-relay';

class CompanyList extends Component{
    render(){
        return null
    }
}

export default createFragmentContainer(CompanyList, graphql`
    fragment CompanyList_viewer on Viewer {
        companies(last: 100) @connection(key: "CompanyList_companies", filters: []){
            edges{
                node{
                    id,
                    name
                }
            }
        }
    }
`)