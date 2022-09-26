import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function HowCreated() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">How was Ed Owl created?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">Ed Owl - the platform, was created by Thomas Storey - ThomasJStoreyMail@gmail.com 
                            <br/><br/> 
                            Thomas Storey is a (2022) graduate of Computing at the University of Bolton - School of Creative Technologies
                            <br/><br/> 
                            Following guidence & direction from Nurun Nahar to incorperating staff-student partnership starting in 2020.
                            <br/><br/>
                            He created this application using a multitude of industry standard technologies.
                            <br/><br/>
                            The entirety of its design is partialy custom built in addition to partly adopted /
                            abstracted from freely available online existing resources.
                            <br/><br/>
                            For specific information on techologies be sure to read the:
                            <br/>
                            What technologies tab below!
                        </p>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default HowCreated