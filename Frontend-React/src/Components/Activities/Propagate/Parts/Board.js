import React, { useContext } from "react";
import { PropagateContext } from "../Propagate";
import Letter from "./Letter";
import "../Propagate.css";

function Board() {

  const { board } = useContext(PropagateContext);

  return (
    <div className="board tiny-scale"> 
      {board.map((attempt, x) => (
        <div className="board-row" key={x}> 
            {attempt.map((letter, y) => {
               return <Letter className="board-row" letterPos={y} attemptVal={x} key={y}/> 
            })}
        </div>
      ))}
      </div>
  );}

export default Board;