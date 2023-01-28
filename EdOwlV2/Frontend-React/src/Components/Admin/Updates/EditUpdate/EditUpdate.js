import { faBug, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import Axios from "../../../../Functionality/Axios";
import LocalStorageFunctions from "../../../../Functionality/LocalStorageFunctions";
import { baseDeleteRequest, baseGetRequest, postUpdate, updateUpdate } from "../../../../Functionality/Requests";
import sleep from "../../../../Functionality/sleep";
import { useStateValue } from "../../../../Functionality/StateProvider";
import "../../Edit-Page.css"

function EditUpdate() {

  const params = useParams();
  const updateId = params?.id ;
  const [{ editUpdate }] = useStateValue();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(editUpdate);

  const [errorMsg, setErrorMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitCounter, setSubmitCounter] = useState(0);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const handleCloseDeleteWarning = () => setShowDeleteWarning(false);

  useEffect(() => {
    fetchData()
}, [])

async function fetchData() {
  if (updateId !== undefined){ setUpdate(await baseGetRequest(`Updates/${updateId}`)) } 
}

  const finalize = async () => {
    setSubmitCounter(submitCounter + 1);
    var request = "";
    if (updateId !== undefined){ request = await updateUpdate({id:updateId, content: update.content}) }
    else{ request = await postUpdate({ content: update.content }) }

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
    try{
      var b = LocalStorageFunctions.insertElement(update) // only inserts if unique 
      if (b){
        setErrorMsg(null)
        setSuccess(true);
        await sleep(3000);
        navigate('/Admin')
      }
    }
    catch(err){
      // forward to error page
    }
    
  }

  async function handleDeleteUpdateButton() {
    setShowDeleteWarning(false)
    await baseDeleteRequest(`Updates/delete/${updateId}`);
    setSuccess(true);
    await sleep(2000);
    navigate('/Admin')
  } 

  return (
    <div className='edit-page font'>
      <div className='edit-page-main shadow tiny-scale'>
        <h2>Update input / Edit Page</h2>
        {success ?
          <div className='edit-page-alt'>
            <h1>Success!</h1>
            <FontAwesomeIcon icon={faGear} className="fa-spin" />
          </div>
          :
          errorMsg ?
            <div className='edit-page-alt'>
              
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
              <form className='edit-page-form'>
                <label htmlFor="Title">Content</label>
                <br />
                <input type="text" id="title" name="title" className="edit-input shadow"
                  value={update.content} onChange={(e) => setUpdate({ ...update, content: e.target.value })} />
              </form>
              <br />
              {/* V HIDE THIS BUTTON IF THE QUIZ IS NOT EDITING AN EXISTING ACTIVITY (no params) */}

              {updateId !== undefined ? <Button className="btn shadow" variant="danger" onClick={() => setShowDeleteWarning(true)}> Delete</Button> : <div> </div> }
              <Button className="btn shadow" variant="secondary" onClick={() => navigate("/Admin")}>Exit</Button>
              <Button className="btn shadow" variant="success" onClick={finalize}> Submit</Button>
              <Button className="btn shadow" variant="warning" onClick={localFinalize}>Local save</Button>
            </div>
        }

        <Modal className="font" show={showDeleteWarning} onHide={handleCloseDeleteWarning} centered>
          <div className="card text-center shadow">
            <div className="card-header"> </div>
            <div className="card-body">
              <div className="edit-page-warning">
                <h5>WARNING:<br /><br />If you delete an activity there is no going back. <br /> ALL user submissions, badges and statistics associated to this activity will also be deleted WITHOUT recovery.</h5>
                <p>Alternatively, if hidden on the main edit page, it will not be visable to users.</p>
              </div>
              <div className="edit-page-delete-buttons">
                <Button className="btn shadow" variant="danger" onClick={handleDeleteUpdateButton}>Delete</Button>
                <Button className="btn shadow" variant="success" onClick={handleCloseDeleteWarning}>Close</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default EditUpdate