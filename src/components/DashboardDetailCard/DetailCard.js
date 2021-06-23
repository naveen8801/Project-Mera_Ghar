import React, { useState } from 'react';
import './DetailCrad.css';

function DetailCard(props) {
  return (
    <div className="details-card">
      <h5>Click on any Marker to get details</h5>
      <h2 className="heading">Name</h2>
      <h3 className="value">Rohit Kumar</h3>
      <h2 className="heading">District</h2>
      <h3 className="value">Aligarh</h3>
      <h2 className="heading">State</h2>
      <h3 className="value">Uttar Pradesh</h3>
      <h2 className="heading">Pincode</h2>
      <h3 className="value">202124</h3>
    </div>
  );
}

export default DetailCard;
