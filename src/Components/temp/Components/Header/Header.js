import React from 'react'
import {Header, Segment, Input, Icon} from 'semantic-ui-react'

class GitHeader extends React.Component{
    render(){
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                <span>
                    'Filler'
                </span>
            </Header>
            <Header floated="right">
                <Input
                    size="mini"
                    icon="search"
                    name="searchTerm"
                    placeholder="Search repositories"
                />
            </Header>
        </Segment>
    }
}

export default GitHeader