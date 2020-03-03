import React from 'react'
import {Segment, Comment,Button, Message, Modal, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import firebase from '../../../../firebase'
import axios from 'axios'
import Header from './Header'


class Repos extends React.Component{
    state ={
        response:[],
        user: firebase.auth().currentUser,
        repositories:[]
    }

    componentDidMount(){
        this.fetchRepos()
    }

    checkRepo = () =>{
        const{
            responses
        } = this.state

        console.log(responses[0].name)
    }

    fetchRepos = () => {
        axios
          .get(`https://api.github.com/users/${this.state.user.displayName}/repos`)
          .then(response => {
            this.setState({
              repositories: response.data
            });
            if (this.state.repositories.length) {
              console.log(this.state.repositories.length);
            }
            console.log(this.state.repositories)
          });
      };  

      test = () =>{
          console.log(JSON.stringify(this.state.responses[0].name))
      }

      render(){
          const {repositories} = this.state
          console.log(JSON.stringify(repositories[0]))
          return(
              <div>
                  <React.Fragment>
                      <Header currentUser={this.props.currentUser}/>
                      <Segment>
                          <div>
                            <Button onClick={this.checkRepo}>Check me!</Button>
                            <Button onClick={this.test}>Test</Button>
                            <Button onClick={() => console.log(repositories)}>Responses</Button>
                          </div>
                          {/* <h1>{repositories[0].name}</h1> */}
                      </Segment>
                  </React.Fragment>
              </div>
          )
      }
}

export default Repos