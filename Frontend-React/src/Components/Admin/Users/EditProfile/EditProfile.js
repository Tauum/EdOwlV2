import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faBug } from "@fortawesome/free-solid-svg-icons"
import { useState, useRef, useEffect } from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom'
import LocalStorageFunctions from "../../../../Functionality/LocalStorageFunctions";
import { baseDeleteRequest, baseGetRequest, postExtra, updateExtra } from "../../../../Functionality/Requests";
import sleep from "../../../../Functionality/sleep";
import { useStateValue } from "../../../../Functionality/StateProvider";
import "../../Edit-Page.css"
import EditEmail from "./EditEmail";
import EditPassword from "./EditPassword";

export default function EditProfile() {

    const params = useParams();
    const extraId = params?.id;
    const [{ editExtra }] = useStateValue();
    const navigate = useNavigate();
    const [extra, setExtra] = useState(editExtra);

    const [errorMsg, setErrorMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const [submitCounter, setSubmitCounter] = useState(0);

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const handleCloseDeleteWarning = () => setShowDeleteWarning(false);

    const [showEmailModal, setShowEmailModal] = useState(false);
    const handleCloseEmailModal = () => setShowEmailModal(false);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleClosePasswordModal = () => setShowPasswordModal(false);

    const [updateEmail, setUpdateEmail] = useState("");
    const [updatePassword, setUpdatePassword] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        if (extraId !== undefined){ setExtra(await baseGetRequest(`Extras/${extraId}`)) }
    }

    const finalize = async () => {
        setSubmitCounter(submitCounter + 1);
        var request = "";
        if (extraId !== undefined){
            request = await updateExtra({ id:extraId, title:extra.title, author:extra.author, 
                summary:extra.summary, content:extra.content, video: extra.video, 
                hidden:extra.hidden, generatedDate:extra.generatedDate 
            })
        }
        else{
            request = await postExtra({ title:extra.title, author:extra.author, 
                summary:extra.summary, content:extra.content, 
                video: extra.video, hidden:extra.hidden
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
            var b = LocalStorageFunctions.insertElement(extra) // only inserts if unique 
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

    async function handleDeleteExtraButton() {
        setShowDeleteWarning(false)
        await baseDeleteRequest(`Extras/delete/${extraId}`);
        setSuccess(true);
        await sleep(2000);
        navigate('/Admin')
    }

    const handleExtraHidden = (value) => {
        setExtra({ ...extra, hidden: value })
    }

    // update modules - list of modules
    // update dob - date
    // update email - string
    // update firstName - string
    // update lastName - string
    // update avatar - int
    // update userInstitutionId - string
    //update updatedOn - date
    // update password - string

    return (
        <div className='edit-page edit-update edit-extra font'>
            <div className='edit-page-main edit-update-main shadow tiny-scale'>
                <h2>Profile Edit</h2>
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
                                <Row>
                                    <Col>
                                        <label htmlFor="Title">First Name</label>
                                        <br />
                                        <input type="text" id="title" name="title" className="edit-input shadow"
                                            value={extra.title} onChange={(e) => setExtra({ ...extra, title: e.target.value })} />
                                    </Col>
                                    <Col>
                                        <label htmlFor="Author">Last Name</label>
                                        <br />
                                        <input type="text" id="author" name="author" className="edit-input shadow"
                                            value={extra.author} onChange={(e) => setExtra({ ...extra, author: e.target.value })} />
                                    </Col>
                                </Row>
                              
                                <Row>
                                    <Col>
                                        <label htmlFor="Content">Main Content</label>
                                        <br />
                                        <textarea name="content" id="content" className="edit-input-description shadow"
                                            value={extra.content} onChange={(e) => setExtra({ ...extra, content: e.target.value })} />
                                    </Col>
                                </Row>

                                <Button className="btn" variant="dark" onClick={() => setShowEmailModal(true)}>Email</Button>

                                <Button className="btn" variant="dark" onClick={() => setShowPasswordModal(true)}>Password</Button>
                                <Row>
                                    <label htmlFor="hide">Activity Hidden</label>
                                    <div className="edit-page-hidden-radio">
                                        <div>
                                            <label htmlFor="hidden">Yes</label>
                                            <input type="radio" id="hide" name="hidden" className="shadow"
                                                checked={extra.hidden === true}
                                                value={true} onChange={(e) => handleExtraHidden(true)} />
                                           
                                        </div>
                                        <div>
                                            <label htmlFor="hidden">No</label>
                                            <input type="radio" id="hide" name="hidden" className="shadow"
                                                checked={extra.hidden === false}
                                                value={false} onChange={(e) => handleExtraHidden(false)} />
                                        </div>
                                    </div>
                                </Row>
                            </form>
                            <br />
                            {/* V HIDE THIS BUTTON IF THE QUIZ IS NOT EDITING AN EXISTING ACTIVITY (no params) */}

                            {extraId !== undefined ? <Button className="btn shadow" variant="danger" onClick={() => setShowDeleteWarning(true)}> Delete</Button> : <div> </div>}
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
                                <Button className="btn shadow" variant="danger" onClick={handleDeleteExtraButton}>Delete</Button>
                                <Button className="btn shadow" variant="success" onClick={handleCloseDeleteWarning}>Close</Button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <EditEmail showEmailModal={showEmailModal} 
                handleCloseEmailModal={handleCloseEmailModal}
                updateEmail={updateEmail}
                />
                <EditPassword/>
            </div>
        </div>
    )
}