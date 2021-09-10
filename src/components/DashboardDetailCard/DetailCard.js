import React, { useState } from 'react';
import './DetailCrad.css';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

function DetailCard(props) {
  const data = useSelector((state) => state.dashboardContentdata);
  return (
    <Card className="details-card">
      <h5 style={{ fontSize: '15px' }}>Click on any Marker to get details</h5>
      <h2 className="heading">Name</h2>
      <h3 className="value">{data.Name}</h3>
      <h2 className="heading">District</h2>
      <h3 className="value">{data.District}</h3>
      <h2 className="heading">State</h2>
      <h3 className="value">{data.State}</h3>
      <h2 className="heading">Pincode</h2>
      <h3 className="value">{data.Pincode}</h3>
    </Card>
  );
}

export default DetailCard;
