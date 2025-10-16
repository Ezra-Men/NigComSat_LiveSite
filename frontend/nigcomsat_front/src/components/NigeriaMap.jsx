import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// --- Fix default Leaflet marker icons (Vite/Webpack builds often break them) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- Helper to auto-fit the map to all markers ---
const FitBounds = ({ sites }) => {
  const map = useMap();

  useEffect(() => {
    if (sites.length > 0) {
      const bounds = L.latLngBounds(
        sites.map((s) => [s.latitude, s.longitude])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [sites, map]);

  return null;
};

const center = [9.082, 8.6753]; // Nigeria center

const NigeriaMap = () => {
  const [sites, setSites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch remote sites from Django backend ---
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sites")
      .then((res) => {
        setSites(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sites:", err);
        setError("Failed to load site data. Please check the backend API.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h3>Loading map data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: "40px" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapContainer center={center} zoom={6} style={{ width: "100%", height: "100%" }}>
        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Adjust view to show all sites */}
        <FitBounds sites={sites} />

        {/* Render markers for each remote site */}
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.latitude, site.longitude]}
            eventHandlers={{
              click: () => setSelected(site),
            }}
          />
        ))}

        {/* Popup when marker is selected */}
        {selected && (
          <Popup
            position={[selected.latitude, selected.longitude]}
            onClose={() => setSelected(null)}
          >
            <div>
              <strong>{selected.name}</strong>
              <br />
              Status: {selected.status}
              <br />
              Location: {selected.location}
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default NigeriaMap;
