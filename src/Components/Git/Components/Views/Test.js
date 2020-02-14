import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
// import SearchForm from '../Data/SearchForm';
import RepoList from '../Data/RepoList';
import {Button, Grid, Label, Header, Segment} from 'semantic-ui-react'
export default class Test extends Component{
    constructor(){
        super()
        this.state = {
        repos: [],
        loading: true,
        user: firebase.auth().currentUser,
      };
    }
      componentDidMount() {
        this.performSearch();
      }

    
      performSearch = (query = 'phaser') => {
        axios.get(`https://api.github.com/search/repositories?q=${query}`)
          .then(response => {
            this.setState({
              query: query,
              repos: response.data.items,
              loading: false
            });
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });    
      }

    render(){
      const{
        user,
        repos
      } = this.state
        return (
          <Segment>
            <div>
              <div className="main-content">
                {
                  (this.state.loading)
                  ? <p>Loading...</p>
                  : <div><h2>{this.state.query}</h2><RepoList data={this.state.repos} /></div>
                }          
              </div>
          </div>
        </Segment>
          );
    }
}