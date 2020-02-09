import React from 'react'
import firebase from '../../firebase'
import {Grid, Header, Icon, Modal, Buttonn, Message, Input} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Git extends React.Component{
    state= {
        user: this.props.currentUser,
        modal:false,
        usersRef: firebase.database().ref("users"),
        admin:false,
        userRef: firebase.auth().currentUser,
        storageRef:firebase.storage().ref()
    }

    componentDidMount(){
        if(this.state.user != null){
            this.state.user.providerData.forEach(profile =>{
                this.state.user.updateProfile({
                    displayName: profile.displayName
                })
            })
        }
    }

    handleSignout = () =>{
        firebase.auth().signOut().then(()=> console.log('signed out!'))
    }

    render(){
        const{
            user,
            modal
        } = this.state


        return(
            <Grid style={{background:"#000"}}>
                <Grid.Column>
                    <Grid.Row style={{padding: "1.2em", margin:"0"}}>
                        <Header inverted floated="left" as="h2">
                            <Icon name="github square"/>
                            <Header.Content color="white">Glu-Git</Header.Content>
                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Git