import axios from "axios";
import { useEffect, useState } from "react";

function Main() {
  const [countrties, setCountries] = useState([]);
  const [prayerTimings, setPrayerTimings] = useState({});
  const [selectCountry, setSelectCountry] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://api.aladhan.com/v1/methods`);
        const countryname = Object.keys(response.data.data);
        setCountries(countryname);
        console.log(response.data.data);
      } catch (error) {
        console.error("error fetching country", error);
      }
    };
    fetchCountry();
  }, []);

  const handleCountryChange = async (selectCountry) => {
    try {
      const response = await axios.get(`https://api.aladhan.com/v1/methods`);

      const prayerData = response.data.data[selectCountry];
      setPrayerTimings(prayerData);
    } catch (error) {
      console.error("error fatching prayer time", error);
    }
  };

  return (
    <>
     <div className="container">
     <h2>:Select a country</h2>
      <select
      className="select-country"
        value={selectCountry}
        onChange={(e) => {
          setSelectCountry(e.target.value);
          handleCountryChange(e.target.value);
        }}
      >
        <option value="">select a country</option>
        {countrties.map((item, index) => (
          <option   value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      {prayerTimings && Object.keys(prayerTimings).length > 0 && (
        <div className="prayer-timings">
          <h2>prayer timing for {selectCountry}</h2>
          <div>
            {prayerTimings.params && prayerTimings.params.Fajr && (
              <span>fajr{prayerTimings.params.Fajr} </span>
            )}
          </div>
          <div>
            {prayerTimings.params && prayerTimings.params.Isha && (
              <span>fajr{prayerTimings.params.Isha} </span>
            )}
          </div>
        </div>
      )}
     </div>
    </>
  );
}

export default Main;
