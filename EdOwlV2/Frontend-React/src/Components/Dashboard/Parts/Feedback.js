import React from 'react'
import { Button, Modal } from 'react-bootstrap'
function Feedback() {
    return (
        <li>
            <div className="dashboard-element-center shadow tiny-scale bottom-center-element">
                <h4 className="dashboard-element-heading">Feedback</h4>
                <div className='feedback-question'>
                    <small>what do you think of... ?</small>
                </div>
                <form className='feedback-form'>
                    {/* conditionally render based on feedback type */}
                    <input type="text-area" className="feedback-text"></input>
                    <br />
                    <Button className='btn feedback-submit shadow' variant="success">Submit</Button>

                </form>
                {/* conditionally render form to a thankyou message after submission*/}
                {/* make this conditionally render if feedback is available */}
                {/* <small>No feedback is available at the moment</small>
    <br/>
    <small>Be sure to check in future for new oppertunities</small> */}
            </div>
        </li>

    )
}

export default Feedback