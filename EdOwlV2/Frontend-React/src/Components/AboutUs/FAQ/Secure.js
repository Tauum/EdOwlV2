import React from 'react'
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function Secure() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">Is Ed Owl secure?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">Security of your personal data is a big question for lots of people.
                            <br /> <br />
                            We try our hardest to respect & protect personal information / data.
                            <br /><br />
                            
                            We use&nbsp;
                            <a href="https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/" target="_blank" rel="noopener noreferrer">
                                HTTPS
                            </a>
                            &nbsp;Within all aspects of network communication & store passwords with modern&nbsp;
                            <a href="https://us.norton.com/internetsecurity-privacy-what-is-encryption.html" target="_blank" rel="noopener noreferrer">
                                Encryption
                            </a>
                            &nbsp;solutions, 
                            In addition to&nbsp;
                            <a href="https://cookie-script.com/documentation/httponly-cookies" target="_blank" rel="noopener noreferrer">
                                HTTPOnly Cookies
                            </a>
                            &nbsp;for authorization & authentication.
                            
                            <br /><br />
                            We will not willingly share / sell any of your personal information / data with any 3rd party providers.
                            <br /><br />
                            However, as a subscribed user, you are subject to partake in research, all data is anonymised for validated Higher Educational research where all personal information is stripped before analysis and subsiquent publishing.
                            <br/><br/>
                            This research is essential in determining the effectiveness of applications such as Ed Owl and how they develop in future.
                            <br /><br />
                            All subscribed users must agree to these terms on sign-up and login in-order to partake in the platform.
                            <br />
                            More information can be seen about our policies here:
                            <br/>
                            <a href="Participant-information-sheet-and-consent.pdf" target="_blank" rel="noopener noreferrer" className="term-element">
                                Participation consent
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a href="termsAndConditions.html" target="_blank" rel="noopener noreferrer" className="term-element">
                                Terms & conditions
                            </a>
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Secure