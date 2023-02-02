import React, { useState, useEffect, } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { redirectGetRequest } from '../../../Functionality/Requests';
import SwipeGame from "./SwipeGame";

// use gesture: https://www.npmjs.com/package/react-use-gesture
// source: https://github.com/queq1890/react-tinder-cards
// modified to: change card display / UI , record results & http impl

function Swipe() {

  const navigate = useNavigate();
  const params = useParams();
  const swipeId = params?.id;
  const [swipe, setSwipe]=useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    var data = (await redirectGetRequest(navigate,`Swipes/${swipeId}`))
    setSwipe(data)
    setRender(true)
  }

  if (render === true){
  return (
  <SwipeGame swipe={swipe}/>
    )
  }
}

export default Swipe