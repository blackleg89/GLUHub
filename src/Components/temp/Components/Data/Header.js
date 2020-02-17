import React from 'react'
import {Header, Segment, Input, Icon} from 'semantic-ui-react'
import firebase from '../../../../firebase'
class GitHeader extends React.Component{
    state={
        user:this.props.currentUser
    }

    render(){
        const {user} = this.state
        return(
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                    <Header.Content>
                        {user.displayName}
                    </Header.Content>
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
        )
    }
}

export default GitHeader