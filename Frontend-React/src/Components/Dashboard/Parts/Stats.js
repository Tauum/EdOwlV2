import React from 'react'
import { Button, Modal } from 'react-bootstrap'
function Stats() {
    return (
        <li>
            <div className="dashboard-element tiny-scale bottom-right-element">
                <h4 className="dashboard-element-heading">Stats</h4>
                <div className='stats-text'>
                    <small>Coming soon...</small>
                </div>
                <Button className='btn stats-submit shadow' variant="secondary" >View more</Button>
            </div>
        </li>
    )
}

export default Stats