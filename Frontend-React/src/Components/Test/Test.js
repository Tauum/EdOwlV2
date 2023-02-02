import React from 'react'
import Countdown from '../../Functionality/Countdown'
import { useStateValue } from '../../Functionality/StateProvider';
import "./Test.css"
function Test() {

  const [{ user }, dispatch] = useStateValue();
  return (
    <Countdown/>
  )
}

export default Test