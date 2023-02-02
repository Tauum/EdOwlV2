import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function TakingPart() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">Why should i use Ed Owl?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">
                           You should take part in using Ed Owl as...
                        </p>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default TakingPart