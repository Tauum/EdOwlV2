import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Dates({createdOn, DoB}) {
    return (
        <Row className='profile-dates'>
            <Col className="profie-created-on top-element shadow">
                <h4 className='profile-dates-text'>Created on
                    {createdOn ?
                        <div>{createdOn?.substring(0, 10)}</div>
                        :
                        <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />
                    }
                </h4>
            </Col>
            <Col className="profie-dob top-element shadow">
                <h4 className='profile-dates-text'>DoB
                    {DoB ?
                        <div>{DoB?.substring(0, 10)}</div>
                        :
                        <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />
                    }
                </h4>
            </Col>

        </Row>
    )
}

export default Dates