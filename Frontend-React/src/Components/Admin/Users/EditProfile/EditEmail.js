import { useState, useRef, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Button } from "react-bootstrap";

const EMAIL_REGEX = /^[A-z0-9-_](?=.*[@])(?=.*[.]).{3,23}$/;
const newDate = new Date();

function EditEmail({ showEmailModal, handleCloseEmailModal, updateEmail }) {

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newValidEmail, setNewValidEmail] = useState(false);
    const [newEmailFocus, setNewEmailFocus] = useState(false);

    const [matchEmail, setMatchEmail] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [dob, setDob] = useState("");
    const [validDob, setValidDob] = useState(false);
    const [dobFocus, setDobFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => { setValidEmail(EMAIL_REGEX.test(email)); }, [email])

    useEffect(() => {
        setNewValidEmail(EMAIL_REGEX.test(newEmail));
        setValidMatch(newEmail === matchEmail && newEmail !== "");
    }, [newEmail, matchEmail])

    useEffect(() => { // THIS IS TO VALIDATE THE BIRTHDATE
        if (dob) {
            if (dob.substring(0, 4) < ((newDate.getFullYear()) - 15)) { setValidDob(true); } // IF DOB IS OVER 16 YEARS OLD
            else { setValidDob(false) }
        }
        else { setValidDob(false) }
    }, [dob])

    useEffect(() => { setErrorMsg(''); }, [email, newEmail, validEmail])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1) {
            // update this to check current email
            setErrorMsg("Current Email is incorrect.");         
            return;
        }
        if (!v2) {
            setErrorMsg("The new email is not valid.");
            return;
        }
        if (!v3) {
            setErrorMsg("The confirm email is not valid.");
            return;
        }
        if (v1 && v2 && v3){
            // on confirming its okay
            // also do a check to see if the email is free to use
            setErrorMsg("Sorry, the desired email is already registered is taken.");
            // if it is save the update & put back to the edit page with the new email in place
        }
    }

    const handleCancel = async (e) => {
        setEmail("")
        setNewEmail("")
        setMatchEmail("")
        handleCloseEmailModal()
    }

    return (
        <Modal className="font" show={showEmailModal} onHide={handleCloseEmailModal} centered>
            <div className="card text-center shadow">
                <div className="card-header" />
                <div className="card-body">
                    <div>
                        <form className="register-form">
                            <label htmlFor="email">
                                Current E-mail
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input className="login-input" type="email" id="email" ref={userRef} autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)} value={email} required aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />

                            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"} >
                                <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade" /><br />
                                Enter your current account email address.
                            </p>

                            <label htmlFor="email">
                                New E-mail
                                <FontAwesomeIcon icon={faCheck} className={newValidEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={newValidEmail || !newEmail ? "hide" : "invalid"} />
                            </label>
                            <input className="login-input" type="email" id="email" ref={userRef} autoComplete="off"
                                onChange={(e) => setNewEmail(e.target.value)} value={newEmail} required aria-invalid={newValidEmail ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setNewEmailFocus(true)} onBlur={() => setNewEmailFocus(false)} />

                            <p id="uidnote" className={newEmailFocus && newEmail && !newValidEmail ? "instructions" : "offscreen"} >
                                <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade" /><br />
                                Preferably your University E-mail <br />
                                4 to 24 characters.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            <label htmlFor="email">
                                Confirm New E-mail
                                <FontAwesomeIcon icon={faCheck} className={validMatch ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchEmail ? "hide" : "invalid"} />
                            </label>
                            <input className="login-input" type="email" id="email" ref={userRef} autoComplete="off"
                                onChange={(e) => setMatchEmail(e.target.value)} value={matchEmail} required aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="uidnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />

                            <p id="uidnote" className={matchFocus && matchEmail && !validMatch ? "instructions" : "offscreen"} >
                                <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade" /><br />
                                This must match the above new email.
                            </p>

                            <br />

                            <div>
                                <Button variant="outline-danger" className='btn shadow' onClick={handleCancel}>Cancel</Button>
                                <Button variant="outline-success" className='btn shadow' onClick={handleSubmit}
                                    disabled={!newValidEmail || !validMatch ? true : false}>Confirm</Button>
                            </div>

                            <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                        </form>
                        <br />
                    </div>

                </div>
            </div>
        </Modal>
    )
}

export default EditEmail