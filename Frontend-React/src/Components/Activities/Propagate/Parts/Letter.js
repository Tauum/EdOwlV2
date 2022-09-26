import React, { useContext, useEffect } from "react";
import "../Propagate.css";
import { PropagateContext } from '../Propagate';
import "../../../../index.css";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledKeys, current, propagate } = useContext(PropagateContext);
  const letter = board[attemptVal][letterPos];
  const correct = propagate.answer.toUpperCase()[letterPos] === letter; // correct letter and position
  const almost = !correct && letter !== "" && propagate.answer.toUpperCase().includes(letter); // almost is if word includes letter
  const letterState = current.attempt > attemptVal && (correct ? "key-correct" : almost ? "key-almost" : "key-error"); // if key not correct or almost set it as error

  useEffect(() => { if (letter !== "" && !correct && !almost) { setDisabledKeys((prev) => [...prev, letter]); } }, [current.attempt]); // if letter clicked not correct or almost disable it

  return (
     <div className="letter medium-scale shadow" id={letterState}>
        {letter}
    </div>
  );
}

export default Letter;