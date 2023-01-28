import React, { useState, useEffect } from 'react'
import "./Error.css"
import { useNavigate } from 'react-router-dom'
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { useStateValue } from '../StateProvider'

function Error() {
  const [{error}, dispatch] = useStateValue();

  const navigate = useNavigate();

  const handleClicked = () => {
    if (error.message){
      console.log("aaa")
      // make a submit function here to post errors to backend
    }
    navigate('/')
  }

  return (
    <div className="error-page">
        <div className="error-content tiny-scale shadow">
            <h1>Oops!</h1>
            <h1>An error occured<br/><FontAwesomeIcon icon={faFaceFrown} className="medium-scale FaFrown fa-beat"/></h1>
            <h3>{error?.message? <div>{error.message}</div> : <div></div>}</h3>
            {/* put error code here? */}
            <p>The action you attempted was not completed. This could be a backend service issue.</p>
            <p>If you continue to recieve this error please contact the service provider.</p>
            
            <Button variant="outline-success" className='btn shadow' onClick={handleClicked}>Return to Home</Button>
        </div>

    </div>
  )
}

export default Error