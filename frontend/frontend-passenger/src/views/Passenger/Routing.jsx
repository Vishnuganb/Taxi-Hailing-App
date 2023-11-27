import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 16.902,
  lng: 79.859,
};

export default function Routing(props) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        });


    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const { from, to } = props;
  
      if (from && to) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: from,
            destination: to,
            travelMode: 'DRIVING',
          },
          (result, status) => {
            if (status === 'OK') {
              setResponse(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
              setError(`Error fetching directions: ${status}`);
            }
          }
        );
      }
    }, [props]);
  
    return (
      <div>
        {error ? (
          <div>{error}</div>
        ) : (
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
            {response && (
              <DirectionsService
                options={{
                  directions: response,
                }}
              />
            )}
          </GoogleMap>
        )}
      </div>
    );
  }