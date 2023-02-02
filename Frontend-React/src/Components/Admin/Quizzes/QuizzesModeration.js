import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import QuizzesModerationTable from './QuizzesModerationTable';
import CustomToggle from '../../../Functionality/CustomToggle';
import { useNavigate } from 'react-router-dom';
import { baseGetRequest } from '../../../Functionality/Requests';

export default function QuizzesModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])
    const navigate = useNavigate();

    
    async function fetchData() {
        setParentToChildData(await baseGetRequest("Quizzes/withoutModule"))
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
        navigate('/Admin/Quiz/New')
    }

    return (
        <div className='accordian-container'>
            <Accordion className="accordian shadow" >
                <Card className='card'>
                    <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                        <CustomToggle eventKey="0">Quizzes</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="moderation-element">
                            Create, edit or delete Quizzes.
                            <br />
                            <Button className="btn shadow" variant="success" onClick={createHandler}>Create</Button>
                            <br />
                            {parentToChildData.length > 0 ?
                                <QuizzesModerationTable parentToChild={parentToChildData}/>
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