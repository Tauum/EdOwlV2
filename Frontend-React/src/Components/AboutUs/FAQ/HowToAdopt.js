import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function HowToAdopt() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">How can We adopt Ed Owl?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">
                            Congratulations on completing your first step towards adopting Ed Owl into your module delivery!
                            <br/><br/>
                            Your next is to contact Nurun Nahar or Thomas Storey at: 
                            <br/>
                            N.Nahar@Bolton.ac.uk or ThomasJStoreyMail@gmail.com
                            <br/>
                            For more information, guidence and tutorials on how to get started. 
                            <br/><br/>
                            If you are already part of the Bolton University Ecosystem it will be straight forward to get you involved.
                            <br/><br/>
                            However, if you are not part of the Bolton University Ecosystem and depending on the scale of your implementation,
                             you may need to deploy your own distribution of Ed Owl.
                            <br/> <br/>
                            But wait!, this is not a problem, as Ed Owl is an&nbsp;
                            <a href="https://www.unesco.org/en/communication-information/open-solutions/open-educational-resources/" target="_blank" rel="noopener noreferrer">
                               Open Educational Resource
                            </a>
                            <br/>
                            Meaning it is freely available at no cost to use, modify or adopt the software to all educational users.
                            <br/><br/>
                            We host all source code on Github with all nessecary information and steps required to adiquately deploy the system.
                            <br/><br/>
                            <small>
                                * Self demployment requires aquisition / funding of appropriate hosting system
                                <br/>
                                You are also responsible for any maintainance, updates & issues encountered.
                                <br/>
                                You should consult your IT department as it takes technical knowledge to deploy but we 
                                will try to provide support as much as possible.
                            </small>
                        </p>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default HowToAdopt