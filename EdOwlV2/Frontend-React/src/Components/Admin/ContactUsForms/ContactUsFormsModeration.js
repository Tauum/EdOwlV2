import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import ContactUsFormsModerationTable from './ContactUsFormsModerationTable';
import CustomToggle from '../../../Functionality/CustomToggle';
import { baseDeleteRequest, baseGetRequest } from '../../../Functionality/Requests';

export default function ContactUsModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])

    const [showDeleteAllWarning, setShowDeleteAllWarning] = useState(false);
    const handleCloseDeleteAllWarning = () => setShowDeleteAllWarning(false);
    
    async function fetchData() {
        setParentToChildData(await baseGetRequest("ContactForms"))
    }

    async function deleteAllData() {
        await baseDeleteRequest("ContactForms/delete/all");
        setParentToChildData([])
        setShowDeleteAllWarning(false)
    }

    useEffect(() => {
        if (loadUncompleted === true) { 
            fetchData();
        }
    }, [loadUncompleted])

    useEffect(() => {console.log(parentToChildData)}, [parentToChildData])

    return (
        <div>
            <div className='accordian-container'>
                <Accordion className="accordian shadow" >
                    <Card className='card'>
                        <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                            <CustomToggle eventKey="0">Contact Forms</CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="moderation-element">
                                Read or delete Contact Us Forms.
                                <br />
                                <br />
                                {parentToChildData.length > 0 ?
                                <div>
                                    <Button onClick={() => setShowDeleteAllWarning(true)} className="btn shadow" variant="danger">Delete all</Button>
                                    <ContactUsFormsModerationTable parentToChild={parentToChildData} setParentToChildData={setParentToChildData} />
                                </div>
                                    
                                    :
                                    <div className="">Data could not be obtained</div>
                                }

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>

            <Modal className="font" show={showDeleteAllWarning} onHide={handleCloseDeleteAllWarning} centered backdrop="static">
                <div className="card text-center shadow">
                    <div className="card-header"> </div>
                    <div className="card-body">
                        <div className="edit-page-warning">
                            <h5>WARNING:<br /><br />If you delete all forms there is no going back. <br /> ALL submissions will be deleted WITHOUT recovery.</h5>
                            <p>Alternatively, you may delete individual instanes seperately, below.</p>
                        </div>
                        <div className="edit-page-delete-buttons">

                                            
                            <Button className="btn moderation-button" variant="danger" onClick={deleteAllData}>Delete</Button>
                            <Button className="btn moderation-button" variant="dark" onClick={handleCloseDeleteAllWarning}>Close</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}