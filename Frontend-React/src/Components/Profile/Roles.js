import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

function Roles({ roles }) {
    return (
        <Row className="profile-info-row-2 profile-info-row">

            <h2 className="profile-row-header profile-role-header">Roles</h2>
            <div className="profile-roles profile-row-content">
                {roles?.map((role, index) => (
                    <Col key={index} className="profile-role profile-row-content-element shadow">
                        {role.name === "ROLE_UNDEFINED" ? <div> <p className="profile-role-text">Undefined</p> <img className="role-icon" src="/Image/Icons/Undefined.svg" alt="undefined icon" /> </div> : <div> </div>}
                        {role.name === "ROLE_STUDENT" ? <div><p className="profile-role-text">Student</p> <img className="role-icon" src="/Image/Icons/Student.svg" alt="student icon" /> </div> : <div> </div>}
                        {role.name === "ROLE_STAFF" ? <div><p className="profile-role-text">Staff</p> <img className="role-icon" src="/Image/Icons/Staff.svg" alt="staff icon" /> </div> : <div> </div>}
                        {role.name === "ROLE_ADMIN" ? <div><p className="profile-role-text">Admin</p> <img className="role-icon" src="/Image/Icons/Admin.svg" alt="admin icon" /> </div> : <div> </div>}
                    </Col>
                ))}
            </div>

        </Row>
    )
}

export default Roles