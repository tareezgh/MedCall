import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import logoIcon from "../assets/ambulance.svg";

interface MarkerProps {
  latitude: number;
  longitude: number;
  popUp: string;
}

interface MapComponentProps {
  markers: MarkerProps[];
}

const MapComponent = ({ markers }: MapComponentProps) => {
  const customIcon = new Icon({
    iconUrl: logoIcon,
    iconSize: [45, 45], // size of the icon
  });

  return (
    <>
      <MapContainer
        center={[32.06823723362243, 34.783579881141655]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}

        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" 
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* Mapping through the markers */}
        {markers.map((marker, key: number) => (
          <Marker
            key={key}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
          >
            <Popup>
              {
                <div className="flex justify-center items-center">
                  {marker.popUp}
                </div>
              }
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;
