import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function CountryDetailsPage() {
  const params = useParams();
  const data = useFetchCountry(params.name);
  console.log(data);
  return (
    <div className="flex flex-col gap-2">
      {params.name}
      <div> Capital {data.capital}</div>
      {data.coatOfArms?.png && (
        <img
          src={data.coatOfArms.png}
          className="img-thumbnail"
          alt="Coat of Arms"
        ></img>
      )}
      {data.maps?.openStreetMaps && (
        <a
          href={data.maps.openStreetMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View on OpenStreetMap
        </a>
      )}

      {data.maps?.googleMaps && (
        <iframe
          src={`https://maps.google.com/maps?q=${data.latlng?.[0]},${data.latlng?.[1]}&z=5&output=embed`}
          width="600"
          height="450"
        ></iframe>
      )}
    </div>
  );
}

function useFetchCountry(countryName) {
  const [data, setData] = useState({});
  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`,
      );

      const json = await response.json();
      setData(json[0]);
    };
    getCountry();
  }, [countryName]);
  return data;
}
