import axios from "axios";
import { setLocationCoords } from "../redux/Slicers";
import store from "../redux/store";

export const handleGetLocation = async (
  driverLocation?: boolean
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentLanguage = localStorage.getItem("selectedLanguage") || "en";

  return new Promise<string | null>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=${currentLanguage}`
            );

            const results = response.data.results;
            if (results.length > 0) {
              const formattedAddress = results[0].formatted_address;
              console.log("Formatted Address:", formattedAddress);
              if (!driverLocation) {
                store.dispatch(
                  setLocationCoords({
                    latitude,
                    longitude,
                    address: formattedAddress,
                  })
                );
              }
              resolve(formattedAddress);
            } else {
              console.error("Geocoder returned no results");
              resolve(null);
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            reject(error);
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
          reject(error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      resolve(null);
    }
  });
};
