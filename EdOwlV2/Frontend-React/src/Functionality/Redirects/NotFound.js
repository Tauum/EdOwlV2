import React from 'react'
import "./Error.css"
import { useNavigate } from 'react-router-dom'
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
function NotFound() {

  const navigate = useNavigate();

  return (
    <div className="error-page font">
        <div className="error-content tiny-scale shadow">
            <h1>404</h1>
            <h1>
              <FontAwesomeIcon icon={faFaceFrown} className="medium-scale FaFrown fa-beat"/>
            </h1>
            <p>The resource you attempted to retrieve could not be found.</p>
            <p>If you continue to recieve this error please contact the service provider.</p>
            
            <Button variant="outline-success" className='btn shadow' onClick={(e) => {navigate('/')}}>Return to Home</Button>
        </div>

    </div>
  )
}

export default NotFound