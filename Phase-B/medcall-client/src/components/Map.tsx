import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet-routing-machine";
import ambulanceIcon from "../assets/ambulance.svg";
import pinDriver from "../assets/pinDriver.svg";
import pinUser from "../assets/pinUser.svg";
import RoutingMachine from "./RoutingMachine";
import { MarkerProps } from "../interfaces/types";

interface MapComponentProps {
  markers: MarkerProps[];
  latitude?: number;
  longitude?: number;
  routes?: boolean;
}

const MapComponent = ({
  markers,
  latitude = 32.06823723362243,
  longitude = 34.783579881141655,
  routes,
}: MapComponentProps) => {
  const getIconByType = (type: "ambulance" | "user" | "driver") => {
    switch (type) {
      case "ambulance":
        return new Icon({ iconUrl: ambulanceIcon, iconSize: [45, 45] });
      case "user":
        return new Icon({ iconUrl: pinUser, iconSize: [55, 55] });
      case "driver":
        return new Icon({ iconUrl: pinDriver, iconSize: [45, 45] });
      default:
        return new Icon({ iconUrl: ambulanceIcon, iconSize: [45, 45] });
    }
  };

  const validLatitude =
    latitude >= -90 && latitude <= 90 ? latitude : 32.06823723362243;
  const validLongitude =
    longitude >= -180 && longitude <= 180 ? longitude : 34.783579881141655;

  return (
    <>
      <MapContainer
        center={[validLatitude, validLongitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {routes && <RoutingMachine markers={markers} />}
        {/* Mapping through the markers */}
        {markers.map((marker, key: number) => (
          <Marker
            key={key}
            position={[marker.latitude, marker.longitude]}
            icon={getIconByType(marker.type)}
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
