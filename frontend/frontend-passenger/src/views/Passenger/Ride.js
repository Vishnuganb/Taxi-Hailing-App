import React, { useState } from "react";
import image from "../../assets/images/SignIn.jpeg";
import { useNavigate } from "react-router-dom";
import vehiclesData from "./vehicles.json";
import "./../../styles/Ride.css";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import {
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CSpinner,
} from "@coreui/react";
import { toast } from "react-toastify";
import { v_required } from "../../utils/validator";
import rideService from "../../services/rideService";

function Ride() {
  // For the server side requests and responses
  const [loading, setLoading] = useState(false);
  const [showMapPopup, setShowMapPopup] = useState(false);
  let navigate = useNavigate();

  const containerStyle = {
    width: '600px',
    height: '500px',
  };
  
  const center = {
    lat: 16.902,
    lng: 79.859,
  };

  const response = sessionStorage.getItem('userid');
  const userData = JSON.parse(response);

  // Form data
  const [rideForm, setRideForm] = useState({
    from: "",
    to: "",
    vehicleType: "",
    fromLat: "",
    fromLon: "",
    toLat: "",
    toLon: "",
  });

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");

  const handleFromSearch = (event) => {
    setFromSearch(event.target.value);
  };

  const handleToSearch = (event) => {
    setToSearch(event.target.value);
  };

  // Update the form data while input
  const onUpdateInput = (e) => {
    setRideForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [rideFormErrors, setRideFormErrors] = useState({
    fromError: "",
    toError: "",
    vehicleTypeError: "",
  });

  const handleSelect = (address, name) => {
    setRideForm((prev) => ({
      ...prev,
      [name]: address,
    }));
  };

  const filterSuggestions = (suggestions) => {
    return suggestions.filter((suggestion) => {
      const placeIds = suggestion.placeId;
      const description = suggestion.description.toLowerCase();
      const isSriLankaAddress = description.includes("sri lanka");
  
      return placeIds && isSriLankaAddress;
    });
  };

  const handleLocationSearch = async (searchText, locationType) => {
    if (!searchText) {
      return; // No search text provided, exit
    }
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchText}&format=json&limit=1`
      );
      const data = await response.json();
  
      if (data.length === 0) {
        console.warn(`No results found for "${searchText}" as ${locationType}`);
        return; // No search results found
      }
  
      const { lat, lon, display_name } = data[0];
  
      if (locationType === "from") {
        setFromSearch(display_name); // Update UI with address
        setRideForm((prev) => ({
          ...prev,
          from: display_name,
          fromLat: lat,
          fromLon: lon,
        }));
      } else {
        setToSearch(display_name);
        // Update state with coordinates
        setRideForm((prev) => ({
          ...prev,
          to: display_name,
          toLat: lat,
          toLon: lon,
        }));
      }
    } catch (error) {
      console.error("Error during location search:", error);
      toast.error("An error occurred while searching for location.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let fromError = "";
    let toError = "";
    let vehicleTypeError = "";
  
    if (!v_required(rideForm.from)) {
      fromError = "Pickup location can not be empty.";
    }
  
    if (!v_required(rideForm.to)) {
      toError = "Drop location can not be empty.";
    }
  
    if (!v_required(rideForm.vehicleType)) {
      vehicleTypeError = "Vehicle type can not be empty.";
    }
  
    // If errors exist, show errors
    setRideFormErrors({
      fromError,
      toError,
      vehicleTypeError,
    });
  
    // If no errors exist, send to the server
    if (!(fromError || toError || vehicleTypeError)) {
      // Sending to the server
      setLoading(true);
  
      const payload = {
        pickupLocation: rideForm.from,
        dropLocation: rideForm.to,
        fromLat: rideForm.fromLat,
        fromLon: rideForm.fromLon,
        toLat: rideForm.toLat,
        toLon: rideForm.toLon,
        vehicleType: rideForm.vehicleType,
        passengerId: userData
      };
  
      rideService.findDriver(payload).then(
        (res) => {
          if (res.type === "OK") {

            toast.success(res.message);
            setShowMapPopup(true);

            console.log(rideForm.from);

          } else if (res.type === "BAD") {
            toast.error(res.message);
          }
  
          setLoading(false);
        },
        (error) => {
          const res =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(res);
          setLoading(false);
        }
      );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        overflowY: "hidden",
        scrollbarWidth: "0",
        msOverflowStyle: "none",
        alignItems: "center", 
        justifyContent: "center", 
      }}
    >
      <CCol md={5}>
        <CCard
          className="mx-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.89)" }}
        >
          <CCardBody className="p-4">
            <h1 className="text-center">Ride</h1>
            <p className="text-medium-emphasis text-center">
              Please enter your credentials
            </p>
            <CForm className="row g-3">
            <CCol md={12}>
              <CFormInput
                type="text"
                id="validationServer01"
                name="from"
                label="Pickup Location"
                placeholder="Enter Pickup Location"
                value={fromSearch}
                onChange={handleFromSearch}
                onBlur={() => handleLocationSearch(fromSearch, "from")}
              />
            </CCol>

            <CCol md={12}>
              <CFormInput
                  type={"text"}
                  id="validationServer02"
                  name="to"
                  label="Drop Location"
                  placeholder= "Enter Drop Location"
                  value={toSearch}
                  onChange={handleToSearch}
                  onBlur={() => handleLocationSearch(toSearch, "to")}
                />
            </CCol>

            <CCol md={12} className="my-3">
              <div style={{ position: "relative" }}>
                <CFormSelect
                  label="Vehicle Type"
                  name="vehicleType"
                  onChange={onUpdateInput}
                  value={rideForm.vehicleType}
                  feedback={rideFormErrors.vehicleTypeError}
                  invalid={rideFormErrors.vehicleTypeError ? true : false}
                >
                  <option value="">Select Vehicle Type</option>
                    {vehiclesData.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.name}>
                        {vehicle.name}
                      </option>
                  ))}
                </CFormSelect>
              </div>
            </CCol>

              <div className="d-grid">
                <CButton
                  color="warning"
                  className="py-2"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  <div className="fw-bold" style={{ color: "black" }}>
                    FIND DRIVER {loading && <CSpinner size="sm" />}
                  </div>
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      {showMapPopup && rideForm.from && rideForm.to && (
        <div className="mt-5 border" style={{ height: '500px', width: '600px' }}>
          <Routing fromLat={rideForm.fromLat} fromLon={rideForm.fromLon} toLat={rideForm.toLat} toLon={rideForm.toLon}/>
        </div>
      )}
    </div>
  );
}

export default Ride;
