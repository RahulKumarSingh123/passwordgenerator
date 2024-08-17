import "./App.css"
import { useCallback, useEffect, useRef, useState } from "react"

export default function App(){
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [copied,setCopied]=useState(false);
  const [password,setPassword]=useState(" ");

  let passwordRef=useRef(null)
  let passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed)
      str=str+"0123456789";
    if(charAllowed)
      str=str+"!@#$%^&*?~";
    let index;
    for(let i=1;i<=length;i++)
    {
      index=Math.floor(Math.random()*str.length);
      pass=pass+str.charAt(index);
    }
    setCopied(false);
    setPassword(pass);
  },[length,numberAllowed,charAllowed]);
  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed])
  
  function copyPassword(){
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  }

  return(
    <div id="container">
      <h2>Password Generator</h2>
      <div className="row">
        <input id="password-box" 
        value={password}
        readOnly
        ref={passwordRef}
        ></input>
        <button
        onClick={copyPassword}
        disabled={copied}
        style={{backgroundColor:(copied)?"gray":"blue"}}
        >{copied?"Copied":"Copy"}</button>
      </div>
      <div className="row">
        <input type="range" value={length} min={8} max={30} onChange={(e)=>{setLength(e.target.value)}}></input>
        <label>Length[{length}]</label>
        <input type="checkbox" checked={numberAllowed} onChange={()=>{setNumberAllowed(prev=>!prev)}}></input>
        <label>Numbers</label>
        <input type="checkbox" checked={charAllowed} onChange={()=>{setCharAllowed(prev=>!prev)}}></input>
        <label>Characters</label>
      </div>
    </div>
  )
}
