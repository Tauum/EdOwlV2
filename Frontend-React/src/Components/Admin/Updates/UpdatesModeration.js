import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import UpdatesModerationTable from './UpdatesModerationTable';
import CustomToggle from '../../../Functionality/CustomToggle';
import { useNavigate } from 'react-router-dom';
import { baseGetRequest } from '../../../Functionality/Requests';

export default function UpdatesModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const navigate = useNavigate();

    async function fetchData() {
        setParentToChildData(await baseGetRequest("Updates"))
    }

    useEffect(() => {
        if (loadUncompleted === true) {
            fetchData();
        }
    }, [loadUncompleted])

    useEffect(() => { console.log(parentToChildData) }, [parentToChildData])

    const createHandler = () => {
        navigate('/Update/New')
    }

    return (
        <div className='accordian-container'>
            <Accordion className="accordian shadow" >
                <Card className='card'>
                    <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                        <CustomToggle eventKey="0">Updates</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="moderation-element">
                            Create, edit or delete Updates.
                            <br />
                            <Button className="btn shadow" variant="success" onClick={createHandler}>Create</Button>
                            <br />
                            {parentToChildData.length > 0 ?
                                <UpdatesModerationTable parentToChild={parentToChildData} />
                                :
                                <div className="">Data could not be obtained</div>
                            }

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}