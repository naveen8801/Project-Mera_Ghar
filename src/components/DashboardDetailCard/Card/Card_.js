import React from 'react';
import './Card_.css';
import request_logo from './../../../assets/user-plus.svg';
import admins_logo from './../../../assets/group.svg';
import accepted_logo from './../../../assets/thumbs-up.svg';
import { Card } from 'react-bootstrap';

function Card_(props) {
  return (
    <Card className="card-div">
      <h4 className="title-card">{props.title}</h4>
      <h2 className="value-card">{props.value}</h2>
      {props.type === 'requests' ? <img src={request_logo} alt="" /> : null}
      {props.type === 'admins' ? <img src={admins_logo} alt="" /> : null}
      {props.type === 'accepted' ? <img src={accepted_logo} alt="" /> : null}
    </Card>
  );
}

export default Card_;
