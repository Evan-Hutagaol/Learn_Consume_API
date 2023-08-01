import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState ("")
  const [isShow, setIsShow] = useState(false) //initialitation of variable for showing value
  

  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();
    const result = value.results.map((data) => {
      return {
        label: data.name,
        value: data.name,
      };
    });
    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)))
  };

  useEffect(() => {
    getBerries();
  }, []);

  // function for button if clicked it will show the value that choose by user
  const handleSubmit = () =>{
    setIsShow(state => !state)
  }

  const handleChange = (value) => {
    setUserSelect(value)
  }

  return <div className="App">
    {/* The value will store to the tag h1 */}
    <h1>{isShow ? userSelect: ""}</h1> 
    {/* Handle button to hide and show values */}
    <button onClick={() => handleSubmit()} disabled={!userSelect}>{isShow ? "Hide Value" : "Show Values"}</button>
    <br/>
    <br/>
    {<Select options={datas} onChange={(e) => handleChange(e.value)}></Select>}</div>;
}

export default App;
