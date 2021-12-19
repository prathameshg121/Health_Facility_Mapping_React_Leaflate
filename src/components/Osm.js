import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap  } from "react-leaflet";
import data from "../data/healthServices.json";
import SearchControler from "./SearchControler";
import SearchBoxState from "./SearchBoxState";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "./constants";
import DataInRadius from "./DataInRadius";

export default function Osm() {

  let [state, setstate] = useState("");

  let [filterData, setfilterData] = useState(data);
  
  let [radiusValue , setradiusValue] = useState(100);

  let userLat = ""
  let userLong =""

  function setState(st) {
    setfilterData(data);
    setstate(st);
    console.log("State input is = " + state);
    filterData = [];

    if (state === "All") {
      state = null;
    }

    if (state) {
      console.log("falu");

      setfilterData((prevData) => {
        return prevData.filter((currUrser, index) => {
          return currUrser.State_Name === state;
        });
      });
    }
  }

  console.log(data[0]);


// --------------------------------------------------------------------
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        console.log(radius);
        const circle = L.circle(e.latlng, 100);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);
    userLat = bbox[1];
    userLong = bbox[0];

    return position === null ? null : (
      <Marker position={position} icon={icon}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }




  // -----------------------distance------


  function getDataUnderRadi(){
    setfilterData(data);
    setfilterData((prevData) => {
      return prevData.filter((currUrser, index) => {

        
        let getRadius = distance(currUrser.latitude, userLat, currUrser.longitude, userLong);
        console.log(getRadius + " radius");
        console.log(radiusValue >= getRadius)
        return radiusValue >= getRadius;
      });
    });

  }


	function distance(lat1, lat2, lon1, lon2)
	{

		// The math module contains a function
		// named toRadians which converts from
		// degrees to radians.
		lon1 = lon1 * Math.PI / 180;
		lon2 = lon2 * Math.PI / 180;
		lat1 = lat1 * Math.PI / 180;
		lat2 = lat2 * Math.PI / 180;

		// Haversine formula
		let dlon = lon2 - lon1;
		let dlat = lat2 - lat1;
		let a = Math.pow(Math.sin(dlat / 2), 2)
				+ Math.cos(lat1) * Math.cos(lat2)
				* Math.pow(Math.sin(dlon / 2),2);
			
		let c = 2 * Math.asin(Math.sqrt(a));

		// Radius of earth in kilometers. Use 3956
		// for miles
		let r = 6371;

		// calculate the result
		return(c * r);
	}


function handleRadiusChange(event){
setradiusValue(event.target.value);
}

  return (
    <div>
      <SearchBoxState getState={setState} />
      <h5>Enter Coordinate details to Find Health Facilities </h5>
      <DataInRadius/>
      <h5>Get Health Facilities According to your current location</h5>
      <h6>Enter Radius in Km</h6>
      <input onChange={handleRadiusChange} value={radiusValue}></input>
      <button onClick={getDataUnderRadi} >Find</button>
      <MapContainer
        center={[20.215253, 77.294533]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <SearchControler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filterData.map((serviceData) => (
          <Marker
            key={serviceData.srno}
            position={[serviceData.latitude, serviceData.longitude]}
            icon={icon}
          >
            <Popup position={[serviceData.latitude, serviceData.longitude]}>
              <div>
                <h2>{serviceData.Health_Facility_Name}</h2>
                <h4>{serviceData.State_Name}</h4>
                <h4>{serviceData.pincode}</h4>
                <h4>{serviceData.Taluka_Name}</h4>
                <h4>{serviceData.Health_Facility_Name}</h4>
                <h4>{serviceData.District_Name}</h4>
                <h4>{serviceData.Block_Name}</h4>
                <h4>{serviceData.Address}</h4>
                <h4>{serviceData.latitude}</h4>
                <h4>{serviceData.longitude}</h4>
              </div>
            </Popup>
          </Marker>
        ))}
        <LocationMarker/>
      </MapContainer>
    </div>
  );
}
