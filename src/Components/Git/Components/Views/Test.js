import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
import SearchForm from '../Data/SearchForm';
import RepoList from '../Data/RepoList';
export default class Test extends Component {
    constructor() {
        super();
        this.state = {
          repos: [],
          loading: true
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
        return (
            <div>
              <div className="main-header">
                <div className="inner">
                  <h1 className="main-title">RepoSearch</h1>
                  <SearchForm onSearch={this.performSearch} />      
                </div>   
              </div>    
              <div className="main-content">
                <div><h2>{this.state.query}</h2><RepoList data={this.state.repos} /></div>        
              </div>
            </div>
          );
    }
}