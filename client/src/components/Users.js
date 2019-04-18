import React from 'react'

const Trip = props => {
    return(
        <div className='expense-wrapper'>
        <p>Email: {props.email}</p>
        <p>Id: {props.id}</p>
        </div>
    )
}


export default Trip