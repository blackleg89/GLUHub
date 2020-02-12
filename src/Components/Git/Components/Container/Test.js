import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
import SearchForm from '../Data/SearchForm';
import RepoList from '../Data/RepoList';
export default class Test extends Component {
    state ={
        user: firebase.auth().currentUser,
        repos:[]
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