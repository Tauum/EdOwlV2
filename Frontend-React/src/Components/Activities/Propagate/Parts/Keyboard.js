import React, {useCallback, useContext, useEffect} from 'react';
import "../Propagate.css";
import Key from './Key';
import "../../../../index.css"
import { PropagateContext } from '../Propagate';

function Keyboard() {

  const { disabledKeys, current, enterKey, deleteKey, selectKey } = useContext(PropagateContext);

  const keyRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => { // this checks letter click and calls select in propogate.js
    if (event.key === "Enter") { enterKey() }
    else if (event.key === "Backspace") { deleteKey() }
    else {
      keyRow1.forEach((key) => { if (event.key.toUpperCase() === key.toUpperCase()) { selectKey(key)} })
      keyRow2.forEach((key) => { if (event.key.toUpperCase() === key.toUpperCase()) { selectKey(key)} })
      keyRow3.forEach((key) => { if (event.key.toUpperCase() === key.toUpperCase()) { selectKey(key)} })
    }
  },[current])

  useEffect(() => { // this allows typing in letters aswell as clicking
    document.addEventListener("keydown", handleKeyboard);
    return () => { document.removeEventListener("keydown", handleKeyboard); }
  }, [handleKeyboard])

  return (
    <div onKeyDown={handleKeyboard} className="all-keyboard">
      <div className="keyboard-row">
        {keyRow1.map((key, i) => { return <Key keyVal={key} key={i} disabled={disabledKeys.includes(key.toUpperCase())}/>})}
      </div>
      <div className="keyboard-row">
        {keyRow2.map((key, i) => { return <Key keyVal={key} key={i} disabled={disabledKeys.includes(key.toUpperCase())}/>})}
      </div>
      <div className="keyboard-row">
      <Key keyVal={"DELETE"} biggerKey/>
        {keyRow3.map((key, i) => { return <Key keyVal={key} key={i} disabled={disabledKeys.includes(key.toUpperCase())}/>})}
      <Key keyVal={"ENTER"} biggerKey/>
      </div>
    </div>
  )
}

export default Keyboard