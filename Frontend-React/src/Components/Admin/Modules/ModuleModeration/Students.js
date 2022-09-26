import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../../Functionality/CustomToggle'

function Students({students}) {
    return (
        <Accordion className="shadow module-modal-accordian">
            <Card.Header className='module-modal-custom-toggle'>  {/* cant bind this to custom toggle */}
                <CustomToggle eventKey="0">students x {students?.length}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body >
                    <ul className="modules-register-list modules-modal-list">
                        {students?.map((student, index) => (
                            <li key={index} className="modules-register-entry small-scale" >
                                <small className="modules-entry-text">Names:<br /> {student?.firstName ? student.firstName : "N/A"}<br />{student?.lastName ? student.lastName : "N/A"}</small>
                                <small className="modules-entry-text">Institution ID: <br />{student?.userInstitutionId ? student.userInstitutionId : "N/A"}</small>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Students