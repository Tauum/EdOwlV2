import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function HowFunded() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">What is EdOwl?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">
                            EdOwl is a research project, conceptualized by Nurun Nahar<br/><br/> 
                            Its intention is to research the effectiveness of game-based applications in Higher education.
                            <br/><br/>
                            As a bi-product, students on supported modules may partake in module-specific extra-curricular learning activities.
                            <br/><br/>
                            This provides freedom to both students and tutors in garnering instant feedback on performance,
                            within the confines of their prefered learning enviroments and on their own terms of self-goverend study schedules.
                        </p>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default HowFunded