import React, { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [prayerTimings, setPrayerTimings] = useState({});
 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/methods`
        );
        const countryNames = Object.keys(response.data.data);
        setCountries(countryNames);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
  
    fetchCountries();
  }, []);
  
  const handleCountryChange = async (selectedCountry) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/methods`
      );
      const prayerData = response.data.data[selectedCountry];
      setPrayerTimings(prayerData);
    } catch (error) {
      console.error("Error fetching prayer timings:", error);
    }
  };
  return (
    <div className="container">
      <h2>Select a country:</h2>
      <select
        className="select-country"
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
  
      {prayerTimings && Object.keys(prayerTimings).length > 0 && (
        <div className="prayer-timings">
          <h2>Prayer Timings for:  {selectedCountry}</h2>
          <div>
            {prayerTimings.params && prayerTimings.params.Fajr && (
              <span>Fajr : {prayerTimings.params.Fajr}</span>
            )}
          </div>
          <div>
            {prayerTimings.params && prayerTimings.params.Isha && (
              <span>Isha : {prayerTimings.params.Isha}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
