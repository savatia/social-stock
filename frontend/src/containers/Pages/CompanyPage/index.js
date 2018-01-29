import React from 'react'
import {Panel} from 'react-bootstrap'

class CompanyPage extends React.Component {
    render() {
        return (
            <h1>{this.props.match.params.id}</h1>
            // <Panel>
            //     <Panel.Body></Panel.Body>
            // </Panel>
        )
    }
}

export default CompanyPage;