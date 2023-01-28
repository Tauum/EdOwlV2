import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import CustomToggle from '../../../Functionality/CustomToggle';
import { useNavigate } from 'react-router-dom';
import { baseGetRequest } from '../../../Functionality/Requests';
import ShiftersModerationTable from './ShiftersModerationTable';

export default function ShiftersModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const navigate = useNavigate();

    
    async function fetchData() {
        setParentToChildData(await baseGetRequest("Shifters/withoutModule"))
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
        navigate('/Admin/Shifter/New')
    }

    return (
        <div className='accordian-container'>
            <Accordion className="accordian shadow" >
                <Card className='card'>
                    <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                        <CustomToggle eventKey="0">Shifters</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="moderation-element">
                            Create, edit or delete Shifters.
                            <br />
                            <Button className="btn shadow" variant="success" onClick={createHandler}>Create</Button>
                            <br />
                            {parentToChildData.length > 0 ?
                                <ShiftersModerationTable parentToChild={parentToChildData}/>
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