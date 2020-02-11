import React, {Component} from 'react'
import Axios from 'axios'
import SearchForm from './SearchForm';
import RepoList from './ReposList';
export default class Github extends Component{
    constructor(){
        super()
        this.state ={
            repos: [],
            loading:true
        }
    }

    componentDidMount(){
        this.performSearch()
    }

    performSearch = (query = 'web') =>{
        Axios.get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response =>{
            this.setState({
                query:query,
                repos:response.data.items,
                loading:false
            })
        })
        .catch(error =>{
            console.log('Error fetching and parsing data', error)
        })
    }


    render(){
        return(
            <div>
                <div className="main-header">
                    <div className="inner">
                        <h1 className="main-title">RepoSearch</h1>
                        <SearchForm onSearch={this.performSearch} />      
                    </div>   
                    </div>    
                    <div className="main-content">
                    {
                        (this.state.loading)
                        ? <p>Loading...</p>
                        : <div><h2>{this.state.query}</h2><RepoList data={this.state.repos} /></div>
                    }          
                </div>
          </div>
        )
    }
}