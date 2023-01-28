import { Link } from 'react-router-dom'
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import "../ModerationTable.css"

export default function UsersModerationTable({ parentToChild }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [user, setUser] = useState();
    
    function showModal(user) {
        setUser(user)
        setShow(true);
    }

    return (
        <div>
            <div className="table-container">
                <ul className="responsive-table">
                    <li className="table-header shadow">
                        <div className="col col-1">Inst ID</div>
                        <div className="col col-1">Names</div>
                        <div className="col col-2">Email</div>
                        <div className="col col-3">Roles</div>
                        <div className="col col-4">Load</div>
                    </li>
                    {parentToChild.map((user, index) => (
                        <li className="table-Row" key={index}>
                            <div className="col col-1" data-label="Name">{user.userInstitutionId}</div>
                            <div className="col col-1" data-label="Name">{user.firstName} {user.lastName}</div>
                            <div className="col col-2" data-label="Email">{user.email}</div>
                            <div className="col col-3" data-label="Role">{user.roles.length}</div>
                            <div className="col col-4" data-label="load">
                                <button className="" onClick={() => showModal(user)}> X </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Modal className="font" show={show} onHide={handleClose} centered backdrop="static">
                <div className="card text-center shadow">
                    <div className="card-header"> </div>
                    <div className="card-body">
                        {user ?
                            <div>
                                <div className="moderation-modal-top">
                                    <div className="moderation-modal-id-cont">
                                        <div className="moderation-modal-id">
                                            ID: {user.id} 
                                        </div>
                                        <div className="moderation-modal-id">
                                            Institution ID: {user.userInstitutionId}
                                        </div>
                                    </div>
                                    <div className="moderation-model-names">
                                        <div>Names:</div>
                                        <div>{user.firstName}</div>
                                        <div>{user.lastName}</div>
                                    </div>
                                    <div className="moderation-model-text">
                                        <div>Dob:</div>
                                        <div>{user.dob} </div>
                                    </div>
                                    <div className="moderation-model-text">
                                        <div>Email:</div>
                                        <div>{user.email}</div>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="moderation-roles">
                                        Roles: 
                                        {user.roles?.map((role, index) => (
                                            <li key={index} className="moderation-role">
                                                {
                                                role.name === "ROLE_UNDEFINED" ? <div>Undefined</div> :
                                                role.name === "ROLE_STUDENT" ? <div>Student</div> : 
                                                role.name === "ROLE_STAFF" ? <div>Staff</div> : 
                                                role.name === "ROLE_ADMIN" ? <div>Admin</div> : 
                                                <div></div>
                                                }
                                            </li>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>Modules</div>
                                <div className="center">
                                    <div className="moderation-modal-list modal-modules">

                                        {user.modules?.map((module, index) => (
                                            <li key={index} className="moderation-modal-el shadow small-scale">
                                                {module.code} - {module.name}
                                            </li>
                                        ))}
                                    </div>
                                </div>
                                <div className="moderation-modal-dates">
                                <div className="moderation-modal-date">
                                    Created on: {user.createdOn ? <div>{user.createdOn?.substring(0,10)}</div> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" /> } 
                                </div>
                                <div className="moderation-modal-date">
                                    Updated on: {user.updatedOn ? <div>{user.updatedOn?.substring(0,10)}</div> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" /> } 
                                </div>
                                </div>
                                <div className="moderation-modal-checks"> 
                                    Enabled: {user.enabled ? 
                                    <img className="icons" src="/Image/Icons/Check.svg" alt="checkmark" /> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />}
                                    T&C: {user.termsAndConditions ? <img className="icons" src="/Image/Icons/Check.svg" alt="checkmark" /> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />}
                                    Initial Register: {user.initialRegister ? <img className="icons" src="/Image/Icons/Check.svg" alt="checkmark" /> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />}
                                </div>

                                <Link to={{ pathname: "/Stats", state: user.id }}>
                                    <Button className="btn btn-primary moderation-button"> Stats </Button>
                                </Link>

                                <Link to={{ pathname: `/Profile/${user.id}`, }}>
                                    <Button className='btn btn-success moderation-button'> Profile </Button>
                                </Link>

                                <Link to={{ pathname: "/Profile/Edit", state: user.email }}>
                                    <Button className='btn btn-warning moderation-button'> Edit </Button>
                                </Link>
                            </div>
                            :
                            <div> Error </div>
                        }
                        
                        <Button variant="btn btn-info moderation-button">Submissions</Button>
                        <Button variant="btn btn-dark moderation-button" onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}