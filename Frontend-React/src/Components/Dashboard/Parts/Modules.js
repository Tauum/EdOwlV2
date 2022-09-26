import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
function Modules() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    var errorVal = new Boolean(false);


    return (
        <li>
        <div className="dashboard-element tiny-scale bottom-left-element">
            <h4 className="dashboard-element-heading">Modules</h4>

            <div className='modules-text'>
                <small className='note'> Quick select recent or view full list below </small>
                
            </div>
            <Button className='btn module-submit shadow' variant="warning" >View more</Button>

            <Modal className="font" show={show} onHide={handleClose} centered backdrop="static">
        <div className="card text-center shadow">
        {/* <div className="card text-center shadow" key={module.id}> */}
                <div className="card-header"> </div>
                <div className="card-body">
                <br/>
                    
                <Button variant="btn btn-dark shadow" onClick={handleClose}>Close</Button>
            </div>
        </div>
    </Modal> 
        </div>
        </li>
    )
}

export default Modules