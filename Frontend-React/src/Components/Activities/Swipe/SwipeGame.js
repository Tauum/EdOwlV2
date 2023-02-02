import React, { useState, useEffect, } from "react";
import { postSubmittedSwipeRequest } from '../../../Functionality/Requests';
import { useStateValue } from '../../../Functionality/StateProvider';
import { useSprings } from "react-spring";
import { useGesture } from "react-with-gesture";
import Card from "./Card";
import "../../../index.css"
import "./Swipe.css";
import PostActivityModal from "../PostActivityModal/PostActivityModal";


const to = i => ({ x: 0, y: i * -12, scale: 1, rot: -10 + Math.random() * 20, delay: i * 150 }); // run on new card when cycling
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });  // run on old card when cycling
const trans = (r, s) => `perspective(1500px) rotateX(15deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function SwipeGame({ swipe }) {

  const [{ user }] = useStateValue();

  const [submittedSwipe, setSubmittedSwipe] = useState({ user: user, swipeId: swipe.id, score: 0, generatedDate: 0, timeTaken: 0, rating: {}, cards: [] })
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const [resultPercentage, setResultPercentage] = useState()
  const [initialDate, setDate] = useState(new Date())
  const [timeTaken, setTimeTaken] = useState()
  const [show, setShow] = useState(false);

  const [gone] = useState(() => new Set()); // unique array[] stores past elements (cleared later for refresh)
  const [props, set] = useSprings(swipe.cards.length, i => ({ ...to(i), from: from(i) })); // increment through array
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

          if ((dir === 1 && swipe.cards[i].correct === true) || (dir === -1 && swipe.cards[i].correct === false)) { // answer correct
            var current = { cardId: swipe.cards[i].id, correct: true, score: swipe.cards[i].score };
            setSubmittedSwipe((prev) => ({ ...prev, cards: prev.cards.concat(current), score: (prev.score + swipe.cards[i].value) }))
          }
          else {
            var current = { cardId: swipe.cards[i].id, correct: false, score: 0 };
            setSubmittedSwipe((prev) => ({ ...prev, cards: prev.cards.concat(current) }))
          }
        }
        // x sets position of card when clicked and not clicked
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; //if card offscreen = true > screen * direction of card OR if card clicked (value OR 0)
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // rotation of card = xdelt + (if card offscreen > direction + velocity OR 0)
        const scale = down ? 1.1 : 1; // if clicked scale card or default
        return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }; // tension - if clicked 800 or is gone (200 OR 500)
        // after letting go of card make it move faster
      });

      if (!down && gone.size === swipe.cards.length) { // if gone[] size = cardData[]
        setTimeout(() => gone.clear() || set(i => to(i)), 600); // ( clear gone[] OR reset position card (i) ) and time of delay?
        // finalize()
      }
    }
  );

  useEffect(() => { // this useEffect runs if all questions have been answered
    setResultPercentage(((submittedSwipe.score * 100) / swipe.value).toFixed(2))  // used to update score percentage 
    if (submittedSwipe.cards.length > 0 && submittedSwipe.cards.length >= swipe.cards.length) { finalize() }
  }, [submittedSwipe])

  async function finalize() { // this cuts the quiz via time here
    if (!alreadySubmitted) {
      setAlreadySubmitted(true)
      var difference = Math.round((new Date() - new Date(initialDate)) / 1000);
      setTimeTaken(difference)

      setSubmittedSwipe(
        await postSubmittedSwipeRequest({
          swipeId: swipe.id, user: user, score: submittedSwipe.score,
          generatedDate: initialDate, timeTaken: difference,
          rating: true, cards: submittedSwipe.cards
        })
      )
      setShow(true);
    }
  }

  return (
    <div className="swipe">
      {props.map(({ x, y, rot, scale }, i) => (
        <Card i={i} x={x} y={y} rot={rot} scale={scale} trans={trans} cardData={swipe.cards} bind={bind} key={i} />
      ))};

      {show &&
        <PostActivityModal
          endContent={swipe.endContent}
          ratingEndpoint={`SubmittedSwipes/vote/${submittedSwipe.id}`}
          reviewLink={`Swipe/${swipe.id}/${submittedSwipe.id}`}
          timeTaken={timeTaken} resultObtained={submittedSwipe.score}
          resultAvailable={swipe.value} resultPercentage={resultPercentage} />
      }


    </div>);
}

export default SwipeGame