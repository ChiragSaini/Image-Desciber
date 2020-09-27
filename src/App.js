import React, { useState } from 'react';
import './App.css';
import Loader from "./assets/loaderT.gif"
import PictureViewer from "./components/PictureViewer";
import deepai from "deepai";

deepai.setApiKey('b96c6b0a-fab7-41ec-86ad-e096850921df');

function App() {
  const [method, setMethod] = useState(true);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(false);

  const handleClick = (e) => {
    setValue("")
    setMethod(prevState => !prevState)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleFileChange = (e) => {
    let reader = new FileReader()
    reader.onloadend = (e) => {
      setValue(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleDescribe = async (e) => {
    setLoading(true)
    let response = await deepai.callStandardApi("neuraltalk", {
      image: value
    });
    console.log(response)
    setLoading(false)
    setOutput(response.output)
  }

  return (
    <div className="main">
      <h1 className="main-header">Image Describer</h1>
      <button className="my-button" onClick={handleClick}>Change input method</button>
      {
        loading && <img src={Loader} height={50} />
      }
      {
        output && <div className="output">{output}</div>
      }
      <PictureViewer imageUrl={value} />
      {
        method
          ?
          <input className="file-upload" type="file" onChange={handleFileChange} />
          :
          <input className="text-input" type="text" value={value} onChange={handleChange} />
      }
      {
        value && <button className="my-button" onClick={handleDescribe}>Let's Describe the Scene</button>
      }
    </div>
  );
}

export default App;
