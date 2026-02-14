import { useEffect, useState, useMemo } from "react";
import { Search } from "./components/Search";
import "./App.css";
import { Link, NavLink, Outlet } from "react-router-dom";

function CountriesScreen() {
  const [searchText, setSearchText] = useState("");
  const { data, loading, error } = useCountries();

  // Filter on the fly - no need for extra state
  const filteredCountries = useMemo(() => {
    return data.filter((country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [data, searchText]);

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-2">
      <Search text={searchText} onText={setSearchText} />
      <div
        className="flex gap-4"
        style={{ display: "flex", alignItems: "start" }}
      >
        <ul className="countryList">
          {filteredCountries.map((country) => (
            <NavLink
              to={`/country/${country.name}`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#90EE90" : "transparent",
                textDecoration: "none",
              })}
            >
              <li className="country" key={country.name}>
                <div>{country.name}</div>
                <img
                  className="flag"
                  src={country.flags.png}
                  alt={country.name}
                />
              </li>
            </NavLink>
          ))}
        </ul>
        <Outlet />
      </div>
      <div>{filteredCountries.length} countries found</div>
    </div>
  );
}

export default CountriesScreen;

function useCountries() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const countries = json.map(({ name, flags }) => ({
          name: name.common,
          flags: flags,
        }));

        setData(countries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
