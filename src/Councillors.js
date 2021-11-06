import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";


function Councillors() {
  
  const [response, setResponse] = useState([]);
  const [myFilter, setMyFilter] = useState('');

  let url = 'http://ws-old.parlament.ch/councillors?format=json';
  const getData = async (url) => {
    const res = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log(res)
    setResponse(res.data);
  };
  
  function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }
  const handleChange = (e) => {
    setMyFilter(e.target.value)
  }

  const handleSearch = () => {
    if(myFilter===''){
      getData(url)
    }else{

      const filteredData = response.filter(value => {
        const searchStr = myFilter.toLowerCase();
        const nameMatches = value.firstName.toLowerCase().includes(searchStr);
        
        return nameMatches
      });
      console.log(filteredData);
      setResponse(filteredData)
    }
  }

  const sortById = () => {
   const sortedResponse = response?.sort(compare)
    console.log(sortedResponse)
    setResponse([...sortedResponse])
  }

  useEffect(() => {
    getData(url)
  }, [url])
  
  return (
    <div>
      <button onClick={sortById}>Sort by ID</button>
      <input onChange={handleChange} type="text" name="filter" id="filter" />
      <button onClick={handleSearch}>search</button>
       <div>
        {response?.map((result) => (
          <p key={result?.id}>
            {result?.id}-{result?.firstName}
          </p>
        ))}
        </div>
      
    </div>
  );
}

export default Councillors;
