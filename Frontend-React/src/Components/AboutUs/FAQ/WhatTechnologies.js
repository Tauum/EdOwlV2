import React from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap'
import CustomToggle from '../../../Functionality/CustomToggle'

function WhatTechnologies() {
    return (
        <Accordion className="shadow about-us-accordian" >
            <Card className='card'>
                <Card.Header className='header-custom-toggle'>  {/* cant bind this to custom toggle */}
                    <CustomToggle eventKey="0">What technologies?</CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body className="faq-content">
                        <p className="faq-text">
                        

                            1. The host machine is an&nbsp;
                            <a href="https://ubuntu.com/" target="_blank" rel="noopener noreferrer">
                               Ubuntu-Linux
                            </a>
                            &nbsp;VM
                            <br />
                            This also uses&nbsp;
                            <a href="https://www.nginx.com/" target="_blank" rel="noopener noreferrer">
                            Nginx 
                            </a>
                            &nbsp;as a web-server & reverse-proxy.
                            <br /><br />

                            2. The Backend stores & manages data within a&nbsp;
                            <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer">
                            MySQL
                            </a>
                            &nbsp;database.
                            <br />
                            Chosen for its entity connected relationships & vast row support
                            <br /><br />
                            3. The back-end handling requests is a&nbsp;
                            <a href="https://www.java.com/en/" target="_blank" rel="noopener noreferrer">
                            Java
                            </a>
                            &nbsp;framework.
                            <br />
                            More specifically: a&nbsp;
                            <a href="https://spring.io/projects/spring-boot" target="_blank" rel="noopener noreferrer">
                            Spring-Boot
                            </a>
                            &nbsp;Restful-WebAPI.
                            <br /><br />

                            4. The application you are interacting with right now is a front-end framework -&nbsp;
                            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                            React
                            </a>
                            <br />
                            This framework uses&nbsp;
                            <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener noreferrer">
                                JSX
                            </a>
                            &nbsp;which is an extension of&nbsp;
                            <a href="https://www.hostinger.com/tutorials/what-is-html" target="_blank" rel="noopener noreferrer">
                                HTML 
                            </a>
                            &nbsp;and&nbsp;
                            <a href="https://www.hostinger.in/tutorials/what-is-javascript" target="_blank" rel="noopener noreferrer">
                            JavaScript 
                            </a>
                            <br /><br />
                            It also uses UI / UX utility:&nbsp;
                            <a href="https://www.zyxware.com/article/what-is-scss-difference-between-css-scss-and-sass" target="_blank" rel="noopener noreferrer">
                                SCSS 
                            </a>
                            &nbsp;&&nbsp;
                            <a href="https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS" target="_blank" rel="noopener noreferrer">
                                CSS 
                            </a>
                            &nbsp;for design.
                            <br /><br />
                            In addition to&nbsp;
                            <a href="https://react-bootstrap.github.io/" target="_blank" rel="noopener noreferrer">
                                React-Bootstrap
                            </a>
                            &nbsp;,&nbsp;
                            <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">
                                FontAwesome
                            </a>
                            &nbsp;,&nbsp;
                            <a href="https://beta.react-spring.dev/docs/components/use-springs/" target="_blank" rel="noopener noreferrer">
                                useSprings
                            </a>
                            &nbsp;,&nbsp;
                            <a href="https://use-gesture.netlify.app/" target="_blank" rel="noopener noreferrer">
                                useGesture
                            </a>
                            <br />
                            as 3rd party packages for UI / UX design & functionality
                        </p>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default WhatTechnologies