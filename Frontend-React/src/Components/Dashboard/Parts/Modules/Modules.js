import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap'
import "./Modules.css";
import Carousel from 're-carousel'
import CarouselPosition from "../../../../Functionality/CarouselPosition"
import { useNavigate } from 'react-router-dom';

function Modules({ modules }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();

    function randomHexColor() {
        let r = Math.floor(Math.random() * 80) + 176;
        let g = Math.floor(Math.random() * 80)  + 176;    
        let b = Math.floor(Math.random() * 80)  + 176;  
        
        // let r = Math.floor(Math.random() * 256);
        // let g = Math.floor(Math.random() * 256);    
        // let b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    const redirect = (module) => {
        navigate(`/Module/${module.code}`)
    }

    return (
        <li>
            <div className="dashboard-element tiny-scale bottom-left-element">
                <h4 className="dashboard-element-heading">Modules</h4>

                <div className='modules-text'>
                    <small className='note'> Quick select or view the full list below </small>
                </div>

                <div className='modules-carousel'>
                    <Carousel loop auto widgets={[CarouselPosition]}>
                        {modules.map((module, index) => (
                            <div className='carousel-module shadow small-scale' key={index}
                            style={{background: randomHexColor()}} onClick={(e) => {redirect(module)}}>
                                <p className='module-element-text'>{module.name ? module.name : "N/A"}</p>
                                <p className='module-element-text'>{module.code ? module.code : "N/A"}</p>
                            </div>
                        ))}
                    </Carousel>

                </div>

                <Button className='btn module-submit shadow' variant="warning" onClick={() => setShow(true)}>View all</Button>

                <Modal className="font" show={show} onHide={handleClose} centered backdrop="static">

                    <div className="card-header"> </div>
                    <br />
                    <h3>Subscribed Modules</h3>
                    <div className="card-body">
                        <div className="modules-list">
                            {modules.map((module, index) => (
                                <div className='module-element small-scale shadow' key={index}>
                                    <p className='module-element-text'>{module.name ? module.name : "N/A"}</p>
                                    <p className='module-element-text'>{module.code ? module.code : "N/A"}</p>
                                    <Button onClick={() => setShow(false)}
                                        variant="warning" className='modules-list-button shadow'>
                                        Load
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button className='btn close-module-modal shadow' variant="dark" onClick={() => setShow(false)}>Close</Button>
                    </div>
                </Modal>
            </div>
        </li>
    )
}

export default Modules