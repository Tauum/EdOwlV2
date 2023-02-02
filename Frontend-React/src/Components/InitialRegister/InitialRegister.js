import { Modal, Form, Button } from 'react-bootstrap';
import { faCheck, faFaceFrown, faInfoCircle, faSmile, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './InitialRegister.css'
import { useStateValue } from '../../Functionality/StateProvider';
import "./InitialRegister.css"
import { baseGetRequest, postLogoutRequest, putInitialRegisterRequest } from '../../Functionality/Requests';

function InitialRegister() {

    const NAME_REGEX = /^[A-z0-9-_].{1,50}$/;
    const ID_REGEX = /^[A-z0-9-_].{1,10}$/;

    const [{ user }] = useStateValue();

    const [firstName, setFirstName] = useState('')
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('')
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [userInstitutionId, setUserInstitutionId] = useState('')
    const [validUserInstitutionId, setValidUserInstitutionId] = useState(false);
    const [userInstitutionIdFocus, setUserInstitutionIdFocus] = useState(false);

    const [student, setStudent] = useState(false)

    const [serverModules, setServerModules] = useState([])
    const [modules, setModules] = useState([]);
    const [avatar, setAvatar] = useState(0)

    useEffect(() => { setValidFirstName(NAME_REGEX.test(firstName)); }, [firstName])
    useEffect(() => { setValidLastName(NAME_REGEX.test(lastName)); }, [lastName])
    useEffect(() => { setValidUserInstitutionId(ID_REGEX.test(userInstitutionId)); }, [userInstitutionId])

    var avatars = [{ id: 1, img: "/Image/Avatars/1.svg" }, { id: 2, img: "/Image/Avatars/2.svg" },
    { id: 3, img: "/Image/Avatars/3.svg" }, { id: 4, img: "/Image/Avatars/4.svg" }]

    const [searchTerm, setSearchTerm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successful, setSuccessful] = useState(false);

    const [showModules, setShowModules] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const handleCloseModules = () => { setShowModules(false) };
    const handleCloseAvatar = () => setShowAvatar(false);

    const logout = async () => {
        await postLogoutRequest();
        window.history.pushState({}, "login", "/Login");
        window.location.reload();
    }

    const handleSubmitAll = async () => {
        // update this to add fields onto state provider user
        var initialRegister = true;

        const v1 = NAME_REGEX.test(firstName);
        const v2 = NAME_REGEX.test(lastName);
        const v3 = ID_REGEX.test(userInstitutionId);
        if (!v1 || !v2 || !v3) {
          setErrorMsg("Invalid Entry");
          return;
        }

        var result = await putInitialRegisterRequest(
            `Users/initialRegister/${user.id}`, {
                firstName: firstName, lastName: lastName, modulesSelected: modules, student: student, 
                userInstitutionId: userInstitutionId, avatar: avatar, initialRegister: initialRegister
            }
        )
        if(result === 0){ setSuccessful(true); }
        else{ setErrorMsg(result); }
    
    }

    const handleLoadModules = async (e) => {
        e.preventDefault();
        setModules([])
        setShowModules(true)
        handleSearch()
    }

    const handleLoadAvatar = async (e) => {
        e.preventDefault();
        setShowAvatar(true)
    }
    
    const handleSearch = async () => {
        if (!searchTerm) { setServerModules(await baseGetRequest(`Modules/dto`)) }
        else { setServerModules(await baseGetRequest(`Modules/dto/byCode/${searchTerm.toUpperCase()}`)) }
    }

    const handleAddModule = async (entry) => {
        if (!modules.includes(entry.code)) { setModules([...modules, entry.code]) }
    }

    const handleRemoveModule = async (entry) => {
        if (modules.includes(entry)) {
            const index = modules.findIndex((SelModule) => SelModule.code === entry.code)
            let newModules = [...modules];
            setModules(modules.filter(element => element.code === entry.code))
            if (index >= 0) { newModules.splice(index, 1); }
            setModules(newModules)
        }
    }

    const handleSelectAvatar = (avatar) => {
        setAvatar(avatar.id)
        handleCloseAvatar()
    }

    if (successful) {
        return (
            <div className="error-page">
                <div className="error-content tiny-scale shadow">
                    <h1>Success!</h1>
                    <h1>You are officially registered<br /><br />
                        <FontAwesomeIcon icon={faSmile} className="medium-scale FaFrown fa-beat" /></h1>
                    <p>You must now relog your account to gain full access.</p>
                    <p>Please click the below and you will be redirected to login.</p>
                    <Button className="btn" variant="warning" onClick={logout}>Relog</Button>
                </div>
            </div>)
    }
    if (errorMsg) {
        return (
            <div className="error-page">
                <div className="error-content tiny-scale shadow">
                    <h1>Oops!</h1>
                    <h1>A Fatal error occured<br /><FontAwesomeIcon icon={faFaceFrown} className="medium-scale FaFrown fa-beat" /></h1>
                    <h3>{errorMsg}</h3>
                    <p>As a result the action you have not been allowed to finish registration related to backend services.</p>
                    <p>Please contact the service provider with your Ed Owl account details.</p>
                    <Button variant="outline-success" className='btn shadow' onClick={logout}>Logout</Button>
                </div>
            </div>)
    }
    else {
        return (
            <div className="initial-register-all">
                <Form className="initial-register-form">
                    <p className="initial-register-information">You must finish registering before gaining access to platform features.</p>
                    <label htmlFor="Name" className="initial-register-label">
                        First name
                        <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                    </label>
                    <br />
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} 
                    className="initial-register-input shadow"
                    type="text" id="firstName" placeholder="Enter First Name"
                    onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)} />
                    <p id="uidnote" className={firstNameFocus ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                        Your first name on your university ID.
                    </p>
                    <br />
                    <label htmlFor="Name" className="initial-register-label">
                        Last name
                        <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                    </label>
                    <br />
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="initial-register-input shadow"
                        type="text" id="lastName" placeholder="Enter Last Name"                     
                        onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)} />
                    <p id="uidnote" className={lastNameFocus ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                        Your last name on your university ID.
                    </p>
                    <br />
                    <label htmlFor="Name" className="initial-register-label">
                        Your institution ID
                        <FontAwesomeIcon icon={faCheck} className={validUserInstitutionId ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validUserInstitutionId || !userInstitutionId ? "hide" : "invalid"} />
                    </label>
                    <br />
                    <input value={userInstitutionId} onChange={(e) => setUserInstitutionId(e.target.value)} 
                    className="initial-register-input shadow"
                    type="text" id="userInstitutionId" placeholder="Enter ID"
                    onFocus={() => setUserInstitutionIdFocus(true)} onBlur={() => setUserInstitutionIdFocus(false)} />
                    <p id="uidnote" className={userInstitutionIdFocus ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                        Your identity code / number on your university ID.
                    </p>
                    <br />
                    <label htmlFor="Name" className="initial-register-label">I am a student</label>
                    <br />
                    <input value={student} onChange={(e) => setStudent(e.target.checked)}
                        type="checkbox" className="form-check-input stuff shadow" id="student" />

                    <p className="initial-register-text">You may pre-load your studying modules and avatar by clicking below or modify them in future via profile.</p>
                    <Button className="btn shadow initial-register-button" variant="secondary" onClick={handleLoadAvatar}>Avatar</Button>
                    <Button className="btn shadow initial-register-button" variant="warning" onClick={handleLoadModules}>Modules</Button>
                    <br />
                    <p className="initial-register-text">Your personal information will not be used for advertising purposes or supplied to third parties.</p>
                    <Button className="btn shadow initial-register-button" variant="info" onClick={logout}>Logout</Button>

                    <Button className="btn shadow initial-register-button" variant="success" onClick={handleSubmitAll}
                    disabled={!validFirstName || !validLastName || !validUserInstitutionId ? true : false}
                    >Submit</Button>

                </Form>

                <Modal show={showModules} onHide={handleCloseModules} backdrop="static" keyboard={false} className="initial-register-modal font" centered>
                    <div>
                        <Modal.Header>
                            <Modal.Title>Module Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <br />
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="initial-register-input module-search-field shadow"
                                type="text" id="searchTerm" placeholder="Enter Module Code" />
                            <input type="submit" className="Send-Message-CTA shadow" value="Search" onClick={handleSearch} />
                            <br />

                            <div className="modules-register">
                                <ul className="modules-register-list">
                                    {serverModules.length > 0 ? <div>
                                        {serverModules.map((entry, index) => (
                                            <li key={index} className="modules-register-entry small-scale shadow">
                                                <div className="modules-entry-text">
                                                    <p className="module-entry-name">{entry.code}</p>
                                                    <small>{entry?.name}</small>
                                                </div>
                                                {modules.includes(entry.code) ?
                                                    <Button className='shadow btn-warning module-entry-add shadow tiny-scale' onClick={() => handleRemoveModule(entry)}>
                                                        X
                                                    </Button>
                                                    :
                                                    <Button className='shadow btn-warning module-entry-add shadow tiny-scale' onClick={() => handleAddModule(entry)}>
                                                        Add
                                                    </Button>
                                                }
                                            </li>
                                        ))}
                                    </div> : <div> No modules found </div>}
                                </ul>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className='initial-register-modal-footer'>
                            <Button type="button" className="btn btn-info module-selection-button shadow" id="submit" onClick={(e) => { setShowModules(false) }}>Close</Button>
                            <Button type="button" className="btn btn-success module-selection-button shadow" id="submit" onClick={handleCloseModules}>Submit</Button>
                        </Modal.Footer>
                    </div>

                </Modal>

                <Modal show={showAvatar} onHide={handleCloseAvatar} backdrop="static" keyboard={false} className="initial-register-modal font">

                    <div>
                        <Modal.Header>
                            <Modal.Title>Avatar Selection</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="modules-register">
                                <ul className="modules-register-list">
                                    {avatars.map((entry, index) => (
                                        <li key={index} className="avatar-select-entry small-scale shadow">
                                            <img className="avatar-selection" src={entry.img} />
                                            <Button className='shadow btn-warning module-entry-add shadow tiny-scale' onClick={(e) => { handleSelectAvatar(entry) }}>
                                                Select
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Modal.Body>

                        <Modal.Footer className='initial-register-modal-footer'>
                            <Button type="button" className="btn btn-secondary module-selection-button shadow" id="submit" onClick={(e) => { setShowAvatar(false) }}>Close</Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default InitialRegister;