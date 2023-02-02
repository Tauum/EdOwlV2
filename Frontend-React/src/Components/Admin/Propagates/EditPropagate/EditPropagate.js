import { faBug, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import LocalStorageFunctions from "../../../../Functionality/LocalStorageFunctions";
import { baseDeleteRequest, baseGetRequest, postPropagate, updatePropagate } from "../../../../Functionality/Requests";
import sleep from "../../../../Functionality/sleep";
import { useStateValue } from "../../../../Functionality/StateProvider";
import "../../Edit-Page.css"

export default function EditPropagate() {

    const params = useParams();
    const propagateId = params?.id;
    const [{ editPropagate }] = useStateValue();
    const navigate = useNavigate();
    const [propagate, setPropagate] = useState(editPropagate);

    const [errorMsg, setErrorMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitCounter, setSubmitCounter] = useState(0);

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const handleCloseDeleteWarning = () => setShowDeleteWarning(false);

    const [showVideoModal, setShowVideoModal] = useState(false);
    const handleCloseVideoModal = () => setShowVideoModal(false);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        if (propagateId !== undefined){ setPropagate(await baseGetRequest(`Propagates/${propagateId}`)) }
    }


    const finalize = async () => {
        setSubmitCounter(submitCounter + 1);
        var request = "";
        if (propagateId !== undefined){
            request = await updatePropagate({ id:propagateId, title:propagate.title, answer: propagate.answer, lives: propagate.lives,
                value: propagate.value, subject: propagate.subject, endContent: propagate.endContent, 
                description: propagate.description, hidden:propagate.hidden, generatedDate:propagate.generatedDate
            })
        }
        else{
            request = await postPropagate({ title:propagate.title, answer: propagate.answer, lives: propagate.lives,
                value: propagate.value, subject: propagate.subject, endContent: propagate.endContent, 
                description: propagate.description, hidden:propagate.hidden
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
        try {
            var b = LocalStorageFunctions.insertElement(propagate) // only inserts if unique 
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

    async function handleDeletePropagateButton() {
        setShowDeleteWarning(false)
        await baseDeleteRequest(`Propagates/delete/${propagateId}`);
        setSuccess(true);
        await sleep(2000);
        navigate('/Admin')
    }

    const handlePropagateHidden = (value) => {
        setPropagate({ ...propagate, hidden: value })
    }

    return (
        <div className='edit-page font'>
            <div className='edit-page-main shadow tiny-scale'>
                <h2>Propagate input / Edit Page</h2>
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
                                <Row className='edit-page-form-row'>
                                    <Col>
                                        <label htmlFor="Title">Title</label>
                                        <br />
                                        <input type="text" id="title" name="title" className="edit-input shadow"
                                            value={propagate.title} onChange={(e) => setPropagate({ ...propagate, title: e.target.value })} />
                                    </Col>
                                    <Col>
                                        <label htmlFor="Subject">Subject</label>
                                        <br />
                                        <input type="text" id="subject" name="title" className="edit-input shadow"
                                            value={propagate.subject} onChange={(e) => setPropagate({ ...propagate, subject: e.target.value })} />
                                    </Col>
                                </Row>

                                <Row className='edit-page-form-row'>
                                    <Col>
                                        <label htmlFor="Answer">Answer</label>
                                        <br />
                                        <input type="text" id="answer" name="answer" className="edit-input shadow"
                                            value={propagate.answer} onChange={(e) => setPropagate({ ...propagate, answer: e.target.value })} />
                                    </Col>
                                    <Col className="edit-input-propagate-numbers">
                                        <div>
                                            <label htmlFor="Value">Lives</label>
                                            <br />
                                            <input type="number" id="Score" name="Score" className="edit-input edit-propagate-number shadow"
                                                value={propagate.lives} onChange={(e) => setPropagate({ ...propagate, lives: e.target.value })} min="0" />
                                        </div>
                                        <div>
                                            <label htmlFor="Value">Score</label>
                                            <br />
                                            <input type="number" id="Score" name="Score" className="edit-input edit-propagate-number shadow"
                                                value={propagate.value} onChange={(e) => setPropagate({ ...propagate, value: e.target.value })} min="0" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='edit-page-form-row edit-page-form-row-description'>
                                    <Col>
                                        <label htmlFor="Description">Description</label>
                                        <br />
                                        <textarea name="description" id="description" className="edit-input-description shadow"
                                            value={propagate.description} onChange={(e) => setPropagate({ ...propagate, description: e.target.value })} />
                                    </Col>
                                    <Col>
                                        <label htmlFor="endContent">Post activity content</label>
                                        <br />
                                        <textarea name="content" id="content" className="edit-input-description shadow"
                                            value={propagate.endContent} onChange={(e) => setPropagate({ ...propagate, endContent: e.target.value })} />
                                    </Col>
                                </Row>
                                <Row className='edit-page-form-row edit-page-form-row-description'>

                                </Row>

                                <label htmlFor="hide">Activity Hidden</label>

                                <div className="edit-page-hidden-radio">
                                    <div>
                                        <label htmlFor="hidden">Yes</label>
                                        <input type="radio" id="hide" name="hidden" className="shadow"
                                            checked={propagate.hidden === true}
                                            value={true} onChange={(e) => handlePropagateHidden(true)} />
                                    </div>
                                    <div>
                                        <label htmlFor="hidden">No</label>
                                        <input type="radio" id="hide" name="hidden" className="shadow"
                                            checked={propagate.hidden === false}
                                            value={false} onChange={(e) => handlePropagateHidden(false)} />
                                    </div>
                                </div>
                            </form>
                            <br />
                            {propagateId !== undefined ? <Button className="btn shadow" variant="danger" onClick={() => setShowDeleteWarning(true)}> Delete</Button> : <div> </div>}
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
                                <Button className="btn shadow" variant="danger" onClick={handleDeletePropagateButton}>Delete</Button>
                                <Button className="btn shadow" variant="success" onClick={handleCloseDeleteWarning}>Close</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}