import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en');
  const [from, setFrom] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = ( ) => {
    
   
    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    
     

    axios({
 
      // Endpoint to send files
      url: 'https://libretranslate.de/translate',
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },

      // Attaching the form data
      data: params
  }).then(res=>{
      console.log(res.data)
      setOutput(res.data.translatedText)
    }).catch((err) => {setOutput(<h1>error</h1>) });
  };

  useEffect(() => {

    axios({
      url: 'https://libretranslate.de/languages',
      method: "GET",
      headers: { 'accept': 'application/json' },
    }).then((res) => {
      console.log(res.data);
      setOptions(res.data);
    }).catch((err) => {setOutput(<h1>error</h1>) });
}, []);



  //  curl -X GET "https://libretranslate.de/languages" -H  "accept: application/json"

  return (
    <div className="App">
      <div>
        From ({from}) :
        <select onChange={(e) => setFrom(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
        To ({to}) :
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={e=>translate()}>Translate</button>
      </div>
    </div>
  );
}

export default App;