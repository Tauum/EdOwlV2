import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import UsersModerationTable from './UsersModerationTable';
import "./UsersModeration.css"
import CustomToggle from '../../../Functionality/CustomToggle';
import { baseGetRequest } from '../../../Functionality/Requests';

export default function UsersModeration() {

    const [loadUncompleted, setLoadUncompleted] = useState(false)
    const [parentToChildData, setParentToChildData] = useState([])

    async function fetchData() {
        const response = await baseGetRequest("Users/getAllUserProfiles");
        setParentToChildData(response)
    }

    useEffect(() => {
        if (loadUncompleted === true) {
            fetchData();
        }
    }, [loadUncompleted])

    useEffect(() => { console.log(parentToChildData) }, [parentToChildData])

    return (
        <div className='accordian-container'>
            <Accordion className="accordian shadow" >
                <Card className='card'>
                    <Card.Header className='header-custom-toggle' onClick={() => { setLoadUncompleted(!loadUncompleted) }}>  {/* cant bind this to custom toggle */}
                        <CustomToggle eventKey="0">Users</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="moderation-element">
                            These are all users within the system.
                            <br /><br />
                            {parentToChildData.length > 0 ?
                                <UsersModerationTable parentToChild={parentToChildData} />
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