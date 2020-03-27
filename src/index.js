import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import firebase from './firebase'
import {
    BrowserRouter as Router,
    Switch, 
    Route,
    withRouter
} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import rootReducer from './reducers'
import {setUser, clearUser} from './actions'
import Spinner from './Spinner'
import Register from './Components/auth/Register'
import App from './Components/App'
import Login from './Components/auth/Login'
const store = createStore(rootReducer)

class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.props.setUser(user)
                this.props.history.push('/')
            }else{
                this.props.history.push('/login')
                this.props.clearUser()
            }
        })
    }

    render(){
        return this.props.isLoading ? (
            <Spinner />
        ): (
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path='/register' component={Register}/>
                <Route path="/login" component={Login}/>
            </Switch>
        )
    }
}

const mapStateFromProps = state => ({
    isLoading:state.user.isLoading
})

const RootWithAuth = withRouter(
    connect(
        mapStateFromProps,
        {setUser, clearUser}
    )(Root)
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth/>
        </Router>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()