import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { MarkerProps } from "../interfaces/types";

interface RoutingMachineProps {
  markers: MarkerProps[];
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 2) {
      const [startMarker, endMarker] = markers;

      const lineOptions: L.Routing.LineOptions = {
        styles: [{ color: "blue", weight: 4 }],
        extendToWaypoints: true,
        missingRouteStyles: [{ color: "red", opacity: 0.8, weight: 4 }],
        missingRouteTolerance: 0,
      };

      const routingControlOptions: L.Routing.RoutingControlOptions = {
        waypoints: [
          L.latLng(startMarker.latitude, startMarker.longitude),
          L.latLng(endMarker.latitude, endMarker.longitude),
        ],
        lineOptions: lineOptions,
      };

      // @ts-ignore
      L.Routing.control(routingControlOptions).addTo(map);
    }
  }, [map, markers]);

  return null;
};

export default RoutingMachine;
