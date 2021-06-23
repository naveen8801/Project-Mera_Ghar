import React from 'react';
import './Card.css'
import request_logo from './../../../assets/user-plus.svg'
import admins_logo from './../../../assets/group.svg';
import accepted_logo from './../../../assets/thumbs-up.svg'

function Card(props) {
    return (
        <div className="card">
            <h4 className="title-card">{props.title}</h4>
            <h2 className='value-card' >{props.value}</h2>
            {
                props.type === "requests" ? <img src={request_logo} alt="" /> : null
            }
            {
                props.type === "admins" ? <img src={admins_logo} alt="" /> : null
            }
            {
                props.type === "accepted" ? <img src={accepted_logo} alt="" /> : null
            }
        </div>
    )
}

export default Card
