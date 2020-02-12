import React from 'react'

export default class SearchForm extends React.Component{
    state = {
        searchText:''
    }

    onSearchChange = e =>{
        this.setState({ searchText: e.target.value})
    }

    handleSubmit = e =>{
        e.preventDefault()
        this.props.onSearch(this.query.value)
        e.currentTarget.reset()
    }

    render(){
        return(
            <form className="seach-form" onSubmit={this.handleSubmit}>
                <label className="is-hidden" htmFor="search">Search</label>
                <input type="search"
                    onChange={this.onSearchChange}
                    name="search"
                    ref={(input) => this.query = input}
                    placeholder="search..."/>
            </form>

        )
    }
}