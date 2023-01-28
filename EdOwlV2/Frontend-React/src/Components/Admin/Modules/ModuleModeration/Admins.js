import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../../Functionality/CustomToggle'

function Admins({admins}) {
    return (
        <Accordion className="shadow module-modal-accordian">
            <Card.Header className='module-modal-custom-toggle'>  {/* cant bind this to custom toggle */}
                <CustomToggle eventKey="0">Admins x {admins?.length}</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body >
                    <ul className="modules-register-list modules-modal-list">
                        {admins?.map((admin, index) => (
                            <li key={index} className="modules-register-entry small-scale" >
                                <small className="modules-entry-text">Names:<br /> {admin?.firstName ? admin.firstName : "N/A"}<br />{admin?.lastName ? admin.lastName : "N/A"}</small>
                                <small className="modules-entry-text">Institution ID: <br />{admin?.userInstitutionId ? admin.userInstitutionId : "N/A"}</small>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}

export default Admins