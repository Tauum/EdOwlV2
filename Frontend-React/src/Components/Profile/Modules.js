import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

function Modules({modules}) {

  return (
    <Row className="profile-info-row-3 profile-info-row">
    <h2 className="profile-row-header">Modules</h2>
    <div className="profile-modules profile-row-content">

    {modules?.map((module, index) => (
        <Col key={index} className="profile-module profile-row-content-element shadow">
            {module.code}
            <br/>
            {module.name}
            <br/>
            <Button className="btn shadow" variant="outline-secondary">View</Button>
        </Col>
    ))}
    </div>
</Row>
  )
}

export default Modules