import React from 'react'
import { Button } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "./Register.css"
import Axios from '../../Functionality/Axios';
import "../../index.css"
import { postRegisterRequestWithoutCredentails } from '../../Functionality/Requests';

const EMAIL_REGEX = /^[A-z0-9-_](?=.*[@])(?=.*[.]).{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;
const newDate = new Date();

const Register = ({handleClose}) => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [dob, setDob] = useState("");
    const [validDob, setValidDob] = useState(false);
    const [dobFocus, setDobFocus] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const[termsAndConditions,setTermsAndConditions]=useState(false)

    useEffect(() => { userRef.current.focus(); }, [])

    useEffect(() => { setValidEmail(EMAIL_REGEX.test(email)); }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => { // THIS IS TO VALIDATE THE BIRTHDATE
        if(dob){    
            if (dob.substring(0, 4) < ((newDate.getFullYear())- 15)){ setValidDob(true);  } // IF DOB IS OVER 16 YEARS OLD
            else{setValidDob(false)}
        }
        else{setValidDob(false)}
    }, [dob])

    useEffect(() => { setErrorMsg(''); }, [email, password, matchPassword, dob, termsAndConditions])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrorMsg("Invalid Entry");
            return;
        }
        if (!termsAndConditions){
            setErrorMsg("You must accept the terms and conditions");
            return;
        }
        var result = await postRegisterRequestWithoutCredentails(
            {email: email.toLowerCase(), password, dob, termsAndConditions}
        )
        if(result === 0){ 
            setSuccess(true);
            setEmail('');
            setPassword('');
            setMatchPassword('');
            setDob("");
            setTermsAndConditions(false);
        }
        else {
            if(result === 1){ setErrorMsg("Registration Failed"); }
            else if(result === 2){ setErrorMsg('No Server Response'); }
            else if(result === 3){ setErrorMsg('Email Taken'); }
            else{ setErrorMsg('Registration Failed'); }
            errRef.current.focus();
        }

    }

    return (
        <div className="register">
            {success ? (
                <div>
                    <h1>Success!</h1>
                    <Button onClick={handleClose} variant="success">Close</Button>
                </div>
            ) : (
                <div>
                    
                    <h1 className="register-title">Account Register</h1>
                    <form className="register-form">
                        <label htmlFor="email">
                            E-mail
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input className="login-input" type="text" id="email" ref={userRef} autoComplete="off" 
                        onChange={(e) => setEmail(e.target.value)} value={email} required aria-invalid={validEmail ? "false" : "true"} 
                        aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} />

                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                            Preferably your University E-mail <br/>
                            4 to 24 characters.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input className="login-input" type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} 
                            required aria-invalid={validPassword ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />

                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade" /><br/>
                            7 to 24 characters.<br />
                            Must include uppercase and lowercase letters and a number <br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input className="login-input" type="password" id="confirm_pwd"  onChange={(e) => setMatchPassword(e.target.value)} value={matchPassword} required
                            aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />
                        
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                            Must match the first password input field.
                        </p>

                        <label htmlFor="date_of_birth">
                            Date of birth
                            <FontAwesomeIcon icon={faCheck} className={validDob ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validDob || !dob ? "hide" : "invalid"} />
                        </label>
                        <input className="register-input" type="date" id="date_of_birth"  onChange={(e) => setDob(e.target.value)} value={dob} required
                            aria-invalid={validDob ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setDobFocus(true)} onBlur={() => setDobFocus(false)} />
                        
                        <p id="confirmnote" className={dobFocus && !validDob ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} className="fa-beat-fade"/><br/>
                            You must be at least 16 years old to register
                        </p>

                        <div className="register-checkboxes">
                            <label className="terms-and-conditions" htmlFor="termsAndConditions">I have read & accept terms / usage</label>
                            <input value={termsAndConditions} onChange={(e)=>setTermsAndConditions(e.target.checked)}
                            type="checkbox" className="form-check-input" id="termsAndConditions" required/>
                        </div>  
                            <a href="Participant-information-sheet-and-consent.pdf" target="_blank" rel="noopener noreferrer"> Participation consent</a>
                            <a href="termsAndConditions.html" target="_blank" rel="noopener noreferrer"> Terms & conditions</a>

                        <Button variant="outline-success" className='btn shadow' onClick={handleSubmit} 
                         disabled={!validEmail || !validPassword || !validMatch || !validDob ||!termsAndConditions ? true : false}>Sign Up</Button>
                         <p ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Register