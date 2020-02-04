import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import '../App.css'
const Warning = () =>{
    return(
        <div className="app">
            <h1 className="white big centered">
                Dit product is nog niet het eind product.
                We zitten op dit moment op versie 0.5, en er komen nog veel uitbreidingen en integraties in de app.
                Er komt bijvoorbeeld de mogelijkheid om vrienden toe tevoegen, een integratie voor github en de gitlab - en voor designers een adobe xd integratie.

                <div className="wrapper"><Link to="/owo"><Button className="warning">Okiedo</Button></Link></div>
            </h1>
        </div>
    )
}

export default Warning