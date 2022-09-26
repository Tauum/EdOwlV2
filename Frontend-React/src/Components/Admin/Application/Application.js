import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import ContactUsFormsModerationTable from './ContactUsFormsModerationTable';
import CustomToggle from '../../../Functionality/CustomToggle';
import { baseDeleteRequest, baseGetRequest } from '../../../Functionality/Requests';

export default function ContactUsModeration() {

    const [loadUncompleted, setShowApplicationModal] = useState(false)

    const [showApplicationModal, setShowDeleteAllWarning] = useState(false);
    const handleCloseDeleteAllWarning = () => setShowDeleteAllWarning(false);
    
    async function fetchData() {
        setParentToChildData(await baseGetRequest("Application/storage"))
    }

    useEffect(() => {
        if (loadUncompleted === true) { 
            fetchData();
            
        }
    }, [loadUncompleted])

    useEffect(() => {console.log(parentToChildData)}, [parentToChildData])

    return (
        <div>
            <Button onClick={(e)=> {setLoadUncompleted(true)}}>Application Information</Button>
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