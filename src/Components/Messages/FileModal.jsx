import React from 'react'
import mime from 'mime-types'
import {Modal, Icon, Input, Button} from 'semantic-ui-react'

class FileModal extends React.Component{
    state ={
        file: null,
        authorized: ['image/jpeg', 'image/png']
    }

    addFile = event => {
        const file = event.target.files[0]
        if(file){
            this.setState({file})
        }
    }

    sendFile = () => {
        const {file}  = this.state
        const {uploadFile, closeModal} = this.props

        if (file !== null){
            if(this.isAuthorized(file.name))
        }
    }
}