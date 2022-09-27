import React from 'react'
import Alert from 'react-bootstrap/Alert'
const AlertBanner = ({ variant, message }) => {
    const newVariant = variant || 'danger'
    const newMessage = message || 'Unexpected Error occurs please try again later'

    return (
        <Alert variant={newVariant} style={{backgroundColor:'red'}}>
            {newMessage}
        </Alert>
    )
}

export default AlertBanner