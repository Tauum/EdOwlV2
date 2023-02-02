import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Modal, ProgressBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'

import { putRatingRequest } from '../../../Functionality/Requests';

function PostActivityModal({ endContent, ratingEndpoint, reviewLink, timeTaken, resultObtained, resultAvailable, resultPercentage }) {

    useEffect(()=>{
        // console.log("endcontent",endContent)
        // console.log("ratingEndpoint",ratingEndpoint)
        // console.log("reviewLink",reviewLink)
        // console.log("timeTaken",timeTaken)
        // console.log("resultObtained",resultObtained)
        // console.log("resultAvailable",resultAvailable)
        // console.log("resultPercentage",resultPercentage)
    },[])
    
  const [rating, setRating] = useState(true)
  const navigate = useNavigate();


    const HandleRatingClicked = () => {
        putRatingRequest(`${ratingEndpoint}/${!rating}`)
        setRating(!rating)
    }

    const redirectToReview = () => {
        // make this redirect to the correct review page for activity submitted
        navigate(`/${reviewLink}`);
    }


  return (
    <Modal className="font" show={true}>
            <div className="card text-center shadow">
              <div className="card-header">
                <div className="card-body">
                  <h4 className="card-title"> You scored: {resultObtained} / {resultAvailable} <br/><br/> Which is: ( {resultPercentage} % ) </h4>
                </div>
                <ProgressBar className='progress-bar-success' animated now={resultPercentage}/>
                <br/>
                <h5> {timeTaken} Seconds to complete. </h5>
                {
                resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj big-scale" src="/Image/Emoji/0-16.svg" alt="" /> :
                resultPercentage >= 17 && resultPercentage <= 33 ? <img className="shadow emoj big-scale" src="/Image/Emoji/17-33.svg" alt="" /> :
                resultPercentage >= 34 && resultPercentage <= 50 ? <img className="shadow emoj big-scale" src="/Image/Emoji/34-50.svg" alt="" />:
                resultPercentage >= 51 && resultPercentage <= 66 ? <img className="shadow emoj big-scale" src="/Image/Emoji/51-66.svg" alt="" />:
                resultPercentage >= 67 && resultPercentage <= 83 ? <img className="shadow emoj big-scale" src="/Image/Emoji/67-83.svg" alt="" />:
                resultPercentage >= 84 && resultPercentage <= 100 ? <img className="shadow emoj big-scale" src="/Image/Emoji/84-100.svg" alt="" />
                : <div></div>
                }

                <div>
                  <p className="vote-title">Did you enjoy this activity?</p>
                  <br/>
                    {rating === true ?<img className="vote-emoj emoj rating-up big-scale shadow" src="/Image/thumb-up.svg" alt="" onClick={HandleRatingClicked}/> : <img className="vote-emoj emoj rating-down shadow" src="/Image/thumb-down.svg" alt="" onClick={HandleRatingClicked}/> }
                </div>
                <br/>
                {endContent !== "" ? <div className="card-footer text-muted"> <div>{endContent}</div> </div> : <div></div>}
                <br/>
                <Link to="/Dashboard"><Button variant="btn btn-dark small-scale">Return</Button></Link>
                <Link to={{ pathname: `/${reviewLink}`}}> <Button variant="btn btn-warning otherbutton">Review</Button> </Link>
              </div>
            </div>
          </Modal>
  )
}

export default PostActivityModal