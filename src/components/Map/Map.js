import React from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import './Map.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updatedashboardContentCard } from './../../actions';

function DashboardMap() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DashboardData.mapdata);
  const setDetails = (Index) => {
    const content = data.filter((i, index) => index == Index);
    const newData = {
      Name: content[0].name,
      District: content[0].district,
      State: content[0].state,
      Pincode: content[0].pincode,
    };
    dispatch(updatedashboardContentCard(newData));
    console.log(newData);
  };

  return (
    <div className="map">
      <Map defaultCenter={[21.1458, 79.0882]} defaultZoom={4.5}>
        <ZoomControl />
        {data.map((i, index) => (
          <Marker
            color="#22577A"
            key={index}
            width={20}
            anchor={[parseFloat(i.lat), parseFloat(i.long)]}
            onClick={() => setDetails(index)}
          />
        ))}
      </Map>
    </div>
  );
}

export default DashboardMap;
