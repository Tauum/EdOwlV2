import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'
import { useStateValue } from '../../../../Functionality/StateProvider';
import Admins from './Admins';
import Students from './Students';

import { useNavigate } from 'react-router-dom';

function ModulesModerationTableModal({ module, setModule, showModuleMenu, setShowModuleMenu }) {

    const navigate = useNavigate();

    const [{ defaultModule, user } ] = useStateValue();
    
    const handleCloseModuleMenu = () => {
        setShowModuleMenu(false);
        setModule(defaultModule);
    }

    const handleEditClicked = (module) => {
        navigate(`/Module/${module.code}/Edit`)
    }

    return (
        <Modal className="font" show={showModuleMenu} centered backdrop="static">
            <div className="card text-center shadow">
                <div className="card-header"> </div>
                <div className="card-body font">
                    <h2>ID: {module?.id} - {module?.code}</h2>
                    <p>Name: {module?.name}</p>
                    <Row>
                        <Admins admins={module.admins}/>
                        <Students students={module.students}/> 
                    </Row>
                    <br />

                    {
                        module.admins?.some((element) => element.id === user.id || user.roles) ?
                            <Button onClick={(e) => handleEditClicked(module)}> Edit </Button>
                            :
                            <small>You cannot edit this module as you are not a module administrator.</small>
                    }
                    <Button variant="btn btn-dark moderation-button" onClick={handleCloseModuleMenu}>Close</Button>
                </div>


            </div>
        </Modal>
    )
}

export default ModulesModerationTableModal