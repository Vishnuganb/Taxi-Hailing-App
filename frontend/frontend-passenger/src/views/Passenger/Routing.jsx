import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "./../../assets/images/locationPin.png";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

function Routing({ fromLat, fromLon, toLat, toLon }) {
  // Consider using a routing API like Google Maps Directions API or Mapbox Directions API
  // for more accurate routing information.
  const route = [
    [fromLat || 16.902, fromLon || 79.859], // Default center
    [toLat || 16.902, toLon || 79.859], // Default center (replace with actual destination)
  ];

  const mapCenter = [fromLat || 16.902, fromLon || 79.859];

  const startMarker = { lat: fromLat, lng: fromLon }; // Consider user input or map click
  const endMarker = { lat: toLat, lng: toLon };   // Consider user input or map click

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: "100%" }}>
      <TileLayer
        attribution='<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
      />
      <Marker position={startMarker} icon={customIcon}>
        <Popup>Pickup Location</Popup>
      </Marker>
      <Marker position={endMarker} icon={customIcon}>
        <Popup>Drop Location</Popup>
      </Marker>
      {/* Consider adding error handling if fromLat, fromLon, toLat, or toLon are invalid */}
      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
}

export default Routing;


