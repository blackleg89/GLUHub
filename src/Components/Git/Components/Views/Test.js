import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
// import SearchForm from '../Data/SearchForm';
// import RepoList from '../Data/RepoList';
import {Button, Grid, Label, Header} from 'semantic-ui-react'
export default class Test extends Component{
        state = {
        repos: [],
        loading: true,
        user: firebase.auth().currentUser,

      };
      componentDidMount() {
        this.fetchRepos();
      }

      
      fetchRepos = () =>{
        let userName = this.state.user.displayName
        axios.get(`https://api.github.com/users/${userName}/repos`)
        .then(response =>{
          this.setState({
            repos: response.data.items,
            loading:false
          })
          console.log(response)
        })
        .catch(error =>{
          console.error(error)
        })
      }




    render(){
      const{
        user,
        repos
      } = this.state
        return (
            <Grid style={{background:"#000"}}>
              <Grid.Column>
                <Grid.Row centered style={{margin:0}}>
                  <Header inverted as="h2">
                    <Header.Content>{user.displayName}</Header.Content>
                  </Header>
                  <Button onClick={this.fetchRepos}/>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          );
    }
}