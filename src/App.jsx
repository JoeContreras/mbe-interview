import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import useSWR from "swr";

function App() {
  const [pokemon, setPokemon] = useState(null);

  const fetcher = async () => {
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=20"
      );
      return res.data.results;
    } catch {
      console.log("there was an error with the fetch");
    }
  };

  const { data, loading, isError, error } = useSWR("pokemon", fetcher);

  if (isError) {
    return <div>{error.toString()}</div>;
  }

  if (loading) {
    return <div>hi</div>;
  }

  if (!data) {
    return <div>is loading</div>;
  }

  const handleClick = async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setPokemon(res.data);
    } catch {
      console.log("there was an error");
    }
  };

  return (
    <div className="flex">
      <div>
        {data.map((item, idx) => (
          <div
            key={`${item.name}`}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
            </a>
            <a
              href="#"
              onClick={() => {
                handleClick(item.url);
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Pokemon Details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <div
        class="ml-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Pokemon Height: {pokemon ? pokemon.height : ""}
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Pokemon Weight: {pokemon ? pokemon.weight : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
