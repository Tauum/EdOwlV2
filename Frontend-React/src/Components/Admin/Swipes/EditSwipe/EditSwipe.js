import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import { useStateValue } from "../../../../Functionality/StateProvider";
import SwipeForm from "./SwipeForm";
import "../../Edit-Page.css"
import sleep from "../../../../Functionality/sleep";
import LocalStorageFunctions from "../../../../Functionality/LocalStorageFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faGear } from "@fortawesome/free-solid-svg-icons";
import { baseDeleteRequest, baseGetRequest, postSwipe, updateSwipe } from "../../../../Functionality/Requests";
import CardsForm from "./CardsForm";

function EditSwipe() {

  const params = useParams();
  const swipeId = params?.id;
  const [{ editSwipe }] = useStateValue();
  const navigate = useNavigate();
  const [swipe, setSwipe] = useState(editSwipe);

  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitCounter, setSubmitCounter] = useState(0);

  const handleCloseDeleteWarning = () => setShowDeleteWarning(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (swipeId !== undefined){ setSwipe(await baseGetRequest(`Swipes/${swipeId}`)) } 
  }

  const finalize = async () => {
    setSubmitCounter(submitCounter + 1);
    var request = "";
    if (swipeId !== undefined){
        request = await updateSwipe({ id: swipeId, title: swipe.title, subject: swipe.subject,
          description: swipe.description, endContent: swipe.endContent, 
          value: swipe.value, hidden: swipe.hidden, cards: swipe.cards
        })
    }
    else{
        request = await postSwipe({ title: swipe.title, subject: swipe.subject, 
          description: swipe.description, endContent: swipe.endContent, 
          value: swipe.value, hidden: swipe.hidden, cards: swipe.cards
        })
    }
    if (request === 200 || request === 201) {
        setErrorMsg(null)
        setSuccess(true);
        await sleep(2000);
        navigate('/Admin')
    }
    else{
        setErrorMsg(request)
    }
  }

    const localFinalize = async () => {
      // var a = LocalStorageFunctions.getLocalActivities()
      try {
        var b = LocalStorageFunctions.insertElement(swipe) // only inserts if unique 
        if (b) {
          setErrorMsg(null)
          setSuccess(true);
          await sleep(3000);
          navigate('/Admin')
        }
      }
      catch (err) {
        // forward to error page
      }

    }

    async function handleDeleteSwipeButton() {
      setShowDeleteWarning(false)
      await baseDeleteRequest(`Swipes/delete/${swipeId}`);
      setSuccess(true);
      await sleep(2000);
      navigate('/Admin')
  }

  return (
    <div className='edit-page font'>
      <div className='edit-page-main shadow tiny-scale'>
        <h2 className='edit-page-title'>Swipe input / Edit Page</h2>
        {success ?
          <div className='edit-page-alt'>
            <h1>Success!</h1>
            <FontAwesomeIcon icon={faGear} className="fa-spin" />
          </div>
          :
          errorMsg ?
            <div className="edit-page-alt">
              <h3>WARNING: An error occured saving to the server - Attempt #{submitCounter}</h3>
              <FontAwesomeIcon icon={faBug} className="fa-shake" />
              <br />
              <p>You may click submit to re-attempt the submission.</p>
              <p>You may also click local save, to save this submission locally to device cookies and submit in future.</p>
              <Button className="btn shadow" variant="success" onClick={finalize}>Re-submit</Button>
              <Button className="btn shadow" variant="secondary" onClick={() => navigate("/Admin")}>Exit</Button>

              <Button className="btn shadow" variant="warning" onClick={localFinalize}>Local Save</Button>
            </div>
            :
            <div>
              <SwipeForm swipe={swipe} setSwipe={setSwipe} />
              <p className="edit-page-questions-note">{swipe.cards.length} Cards</p>
              <Button className="btn shadow" variant="info" onClick={(e) => {setShowCards(true)}}>Edit Cards</Button>
              {swipeId !== undefined ? <Button className="btn shadow" variant="danger" onClick={() => setShowDeleteWarning(true)}>Delete</Button> : <div> </div> }
              <Button className="btn shadow" variant="secondary" onClick={() => navigate("/Admin")}>Exit</Button>
              <Button className="btn shadow" variant="success" onClick={finalize}> Submit Swipe</Button>
              <Button className="btn shadow" variant="warning" onClick={localFinalize}> Local save</Button>
            </div>
        }
      </div>

      <CardsForm swipe={swipe} setSwipe={setSwipe} showCards={showCards} setShowCards={setShowCards}/>

      <Modal className="font" show={showDeleteWarning} onHide={handleCloseDeleteWarning} centered>
        <div className="card text-center shadow">
          <div className="card-header"> </div>
          <div className="card-body">
            <div className="edit-page-warning">
              <h5>WARNING:<br /><br />If you delete an activity there is no going back. <br /> ALL user submissions, badges and statistics associated to this activity will also be deleted WITHOUT recovery.</h5>
              <p>Alternatively, if hidden on the main edit page, it will not be visable to users.</p>
            </div>
            <div className="edit-page-delete-buttons">
              <Button className="btn shadow" variant="danger" onClick={handleDeleteSwipeButton}>Delete</Button>
              <Button className="btn shadow" variant="success" onClick={handleCloseDeleteWarning}>Close</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EditSwipe