import React from 'react'
import firebase from '../../firebase'
import {
    Grid,
    Form,
    Button,
    Header,
    Message,
    Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Login extends React.Component{
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
    }

    displayErrors=  errors =>   
        errors.map((error, i) => <p key={i}>{error.message}</p>)

    handleChange = event =>{
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({errors: [], loading:true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading:false
                    })
                })
        }
    }
    isFormValid = ({email, password})=> email && password

    handleInputError = (errors, inputName) =>{
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : ""
    }

    render(){
        const {email, password,loading} = this.state
        return(
            <Grid textAlign="center" verticalAlign="middle" className="login-App">
                <Grid.Column style={{maxWidth:450}}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="bolt" color="violet"/>
                        Login to GLU-Hub
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeHolder="email"
                            onChange={this.handleChange}
                            value={email}
                            type="email"
                        />

                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeHolder="Password"
                            onChange={this.handleChange}
                            value={password}
                            type="password"
                        />

                        <Button
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="violet"
                            fluid
                            size="large"
                        >
                            Login
                        </Button>
                    </Form>
                    <Message>
                        Don't have an account? <Link to="/register">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }

}

export default Login