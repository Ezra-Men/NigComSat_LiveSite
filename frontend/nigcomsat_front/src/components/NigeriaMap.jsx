import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

const containerStyle = { width: '100%', height: '100vh' };
const center = { lat: 9.082, lng: 8.6753 }; // Nigeria center

function NigeriaMap() {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY  // from your .env file
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/sites/')
      .then(res => setSites(res.data))
      .catch(err => console.error('Error fetching sites:', err));
  }, []);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
      {sites.map(site => (
        <Marker
          key={site.id}
          position={{ lat: site.latitude, lng: site.longitude }}
          onClick={() => setSelected(site)}
        />
      ))}
      {selected && (
        <InfoWindow
          position={{ lat: selected.latitude, lng: selected.longitude }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <strong>{selected.name}</strong><br />
            Status: {selected.status}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default NigeriaMap;
