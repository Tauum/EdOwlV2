import React, { useContext } from "react";
import { PropagateContext } from "../Propagate";
import "../Propagate.css"

function Key({ keyVal, biggerKey, disabled }) {
  const { selectKey, deleteKey, enterKey, disabledKeys } = useContext(PropagateContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") { enterKey(); }
    else if (keyVal === "DELETE") { deleteKey(); } 
    else { selectKey(keyVal); }
  };

  if (!disabled){ // if key is not disabled
  return (
    <button className="key medium-scale shadow"
      id={biggerKey ? "biggerKey" : ""} onClick={selectLetter}>
      {keyVal}
    </button>
  );
  }
  else { // if key is disabled dont allow press and change visual
    return (
      <button className="key-disabled medium-scale shadow"
        id={biggerKey ? "biggerKey" : ""} onClick={selectLetter} disabled={disabled}>
        {keyVal}
      </button>
    );
  }

}

export default Key;