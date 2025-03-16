import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";
import LightTrack from "./components/light_track";
import Fromat from "./components/Design_form/format"
import Sf from "./components/sf"


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData =  async () => {
      const res = await fetch('https://drogapharmacy.com/pserver:8080')
      const data_res = await res.json()
      console.log(data_res)
      setData(data_res)
    }
    fetchData();
  }, [])
  return (
    <div>
      {/* <LightTrack /> */}
      <Home items={data.items}/>
    </div>
  );
}

export default App;
