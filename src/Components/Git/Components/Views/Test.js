import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
export default class Test extends Component {
    costructor(){
        super()
        this.state ={
            repos:[]
        }
    }
    
    componentDidMount(){
        this.performSearch()
    }

    performSearch = (query = 'phaser') =>{
        axios.get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response =>{
            this.setState({
                query:query,
                repos:response.data.items
            })
        })
    }

    
    render(){
        return(
            <div className="main-content">
                <div className="inner">
                    <h1 className="main-title">RepoSearch</h1>
                    <SearchForm onSearch={this.performSearch}/>
                </div>
            </div>
            <div className="main-content">
                {
                    <div><h2>{this.state.query}</h2><Repolist data={this.state.repos}/></div>
                }
            </div>
        )
    }
}