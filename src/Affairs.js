import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Affairs() {
  const [response, setResponse] = useState([]);

  let url = "http://ws-old.parlament.ch/affairs/states?format=json";
  const getData = async (url) => {
    const res = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data);
    setResponse(res.data);
  };

  function compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  const sortById = async () => {
    const sortedResponse = response?.sort(compare);
    console.log(sortedResponse);
    setResponse([...sortedResponse]);
  };
  const sortByDate = () => {
    const sortedDate = response.sort(function (a, b) {
      return new Date(b.updated) - new Date(a.updated);
    });
    setResponse([...sortedDate]);
  };
  useEffect(() => {
    getData(url);
  }, [url]);

  return (
    <div>
      <button onClick={sortById}>Sort by ID</button>
      <button onClick={sortByDate}>sort by date</button>
      <div>
        {response?.map((result) => (
          <p key={result?.id}>
            {result?.id}-{result?.updated}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Affairs;
