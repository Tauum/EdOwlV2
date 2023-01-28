import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import CustomToggle from '../../../Functionality/CustomToggle';
import { useNavigate } from 'react-router-dom';
import { baseGetRequest } from '../../../Functionality/Requests';
import SwipesModerationTable from './SwipesModerationTable';

export default function SwipesModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const navigate = useNavigate();

    
    async function fetchData() {
        setParentToChildData(await baseGetRequest("Swipes/withoutModule"))
    }

    useEffect(() => {
        if (loadUncompleted === true) { 
            fetchData();
        }
    }, [loadUncompleted])

    useEffect(() => {console.log(parentToChildData)}, [parentToChildData])

    useEffect(() => {
        if (loadUncompleted === true) { fetchData() }
    }, [loadUncompleted])

    const createHandler = () => {
        navigate('/Admin/Swipe/New')
    }

    return (
        <div className='accordian-container'>
            <Accordion className="accordian shadow" >
                <Card className='card'>
                    <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                        <CustomToggle eventKey="0">Swipes</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="moderation-element">
                            Create, edit or delete Swipes.
                            <br />
                            <Button className="btn shadow" variant="success" onClick={createHandler}>Create</Button>
                            <br />
                            {parentToChildData.length > 0 ?
                                <SwipesModerationTable parentToChild={parentToChildData}/>
                                :
                                <div>Data could not be obtained</div>
                            }

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
}