import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function WhySignedOut() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">Why do I keep getting signed out?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">This happens when you might have "Block third-party cookies" enabled in the browser.
                            <br/><br/> 
                            To fix this issue follow the following instructions:
                            <br/><br/> 
                            Settings → Site Settings → Cookies and site data → Block third-party cookies
                            <br/><br/>
                            If you are experiencing further issues, please contact your administrator.
                        </p>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default WhySignedOut