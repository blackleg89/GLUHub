import React, { Component } from 'react';
import firebase from '../../../../firebase'
import axios from 'axios'
export default class Test extends Component {
    state ={
        user: firebase.auth().currentUser,
        repos:[]
    }

    fetchRepos = (user = this.state.user) =>{
        axios.get(`https://api.github.com/users/${user}/repos`)
            .then(response =>{
                this.setState({
                    user:this.state.user,
                    repos:response.data.items
                })
            })
            .catch(error =>{
                console.log('Error fetching and parsing data', error)
            })
    }
    
    
    render(){
        return(
            <div className="main-content">

            </div>
        )
    }
}