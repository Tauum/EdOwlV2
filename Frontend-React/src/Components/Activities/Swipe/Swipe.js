import React, { useState, useEffect } from "react";
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "../../../index.css"
import "./Swipe.css";

// use gesture: https://www.npmjs.com/package/react-use-gesture
// source: https://github.com/queq1890/react-tinder-cards
// modified to: change card display / UI , record results & http impl

const cardData = [
  {
    id: 1,
    question: "Islamic finance doesnt have different requirements",
    pic: "https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    subText: "Check out week 5 documents",
    correct: false,
    value: 15
  },
  {
    id: 2,
    question: "CEO requirements",
    pic:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdoerlife.com%2Fwp-content%2Fuploads%2F2020%2F03%2FSP.png&f=1&nofb=1",
      subText: "They must decide high-level policy and strategy",
    correct: true,
    value: 6
  },

  {
    id: 3,
    question: "The sky is green",
    subText: "Make sure to look outside!",
    correct: false,
    value: 2
  }
  ,
  {
    id: 4,
    question: "This signifies British currency",
    pic: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.kindpng.com%2Fpicc%2Fm%2F112-1123896_black-pound-sterling-symbol-clipart-pound-sign-hd.png&f=1&nofb=1",
    subText: "Maybe check in your wallet",
    correct: true,
    value: 17
  }
];

const to = i => ({ x: 0, y: i * -12, scale: 1, rot: -10 + Math.random() * 20, delay: i * 150 }); // run on new card when cycling
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });  // run on old card when cycling

const trans = (r, s) =>
  `perspective(1500px) rotateX(15deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

function Swipe() {

  const [gone] = useState(() => new Set()); // unique array[] stores past elements (cleared later for refresh)
  const [props, set] = useSprings(cardData.length, i => ({ ...to(i), from: from(i) })); // increment through array
  const bind = useGesture( // unsure of what delta is //https://www.npmjs.com/package/react-use-gesture
    ({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {

      const trigger = velocity > 0.2; // bool event of grabbed & moved card
      const dir = xDir < 0 ? -1 : 1; // num of direction (-1 left, 1 right) // has to be -1 otherwise glitching

      if (!down && trigger) gone.add(index); // if not clicked and in true / false > append index to gone[]
      // trigger a little paper sound here, like a card has been let go or something or a sticker maybe
      set(i => {
        if (index !== i) return; // unsure - error handling maybe?
        
        const isGone = gone.has(index);
        if (isGone) {
          if ((dir === 1 && cardData[i].correct === true ) || (dir === -1 && cardData[i].correct === false)){ // answer correct
            console.log("true")

          }
          else{
            console.log("false")

          }
        }
        // x sets position of card when clicked and not clicked
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; //if card offscreen = true > screen * direction of card OR if card clicked (value OR 0)
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // rotation of card = xdelt + (if card offscreen > direction + velocity OR 0)
        const scale = down ? 1.1 : 1; // if clicked scale card or default
        return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }; // tension - if clicked 800 or is gone (200 OR 500)
        // after letting go of card make it move faster
      });

      if (!down && gone.size === cardData.length) { // if gone[] size = cardData[]
        setTimeout(() => gone.clear() || set(i => to(i)), 600); // ( clear gone[] OR reset position card (i) ) and time of delay?
        // insert game end here
      }
    }
  );

  return (
    <div className="swipe">
      {props.map(({ x, y, rot, scale }, i) => (
        <Card i={i} x={x} y={y} rot={rot} scale={scale} trans={trans} cardData={cardData} bind={bind} key={i} />
      ))};
    </div>);
}

export default Swipe;
