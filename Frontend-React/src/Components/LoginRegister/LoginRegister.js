import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import "./LoginRegister.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react';
import { useStateValue } from '../../Functionality/StateProvider';
import { faCheck, faTimes, faGear, faBell, faBug, faLock, faCircleQuestion, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Register from './Register';
import sleep from '../../Functionality/sleep';
import { postLoginRequest } from '../../Functionality/Requests';

const EMAIL_REGEX = /^[A-z0-9-_](?=.*[@])(?=.*[.]).{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,24}$/;

const LoginInRegister = () => {

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function openRegister() { setShow(true); }

  useEffect(() => { setValidEmail(EMAIL_REGEX.test(email)); }, [email])
  useEffect(() => { setValidPassword(PWD_REGEX.test(password)); }, [password])
  useEffect(() => { setErrorMsg(''); }, [email, password])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrorMsg("Invalid Entry");
      return;
    }
    var result = await postLoginRequest( { email, password } )
    if(result.email){ 
      setEmail('');
      setPassword('');
      setSuccess(true);
      await sleep(3000);
      dispatch({ type: "SET_USER", user: result });
      navigate('/')
    }
    else{
      setErrorMsg(result);
      errRef.current.focus();
    }
  }

  return (
    <div className='login-register font'>
      <div className='all shadow tiny-scale'>
        <Link to="/"> <img className="login-logo shadow medium-scale" src="/Image/baselogo.svg" alt="logo" /> </Link>
        <div className='title'><h1>Login</h1></div>
        {success ? (
          <div>
              <h1>Success!</h1>
              <FontAwesomeIcon icon={faGear} className="fa-spin"/>
          </div>
        ) : (
          <div>
            <form className="login-form other-login-reduction">
              <label htmlFor="email">
                E-mail
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
              </label>
              <input className="login-input" type="text" id="email"
              onChange={(e) => setEmail(e.target.value)} value={email} required aria-invalid={validEmail ? "false" : "true"}  />

              <label htmlFor="password">
                Password
                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
              </label>
              <input className="login-input" type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} 
              required aria-invalid={validPassword ? "false" : "true"} aria-describedby="pwdnote"/>
            </form>
            <Button variant="outline-info" className='btn shadow' onClick={openRegister}>Register</Button>
            <Button variant="outline-success" className='btn shadow' type="submit" onClick={handleSubmit}
            disabled={!validEmail || !validPassword ? true : false}>Sign In</Button>
            <br />
          </div>
        )}
        <small className='note'> By Registering / Signing in,<br />you are agreeing to Ed Owl's<br />Terms of service. </small>
        <div ref={errRef} className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {
          errorMsg === "Invalid Entry" ?  <FontAwesomeIcon icon={faExclamationTriangle} className="fa-shake"/>
          :
          errorMsg === "Incorrect Credentials" ? <FontAwesomeIcon icon={faBell} className="fa-shake"/> 
          :
          errorMsg === "Account Disabled" ? <FontAwesomeIcon icon={faLock} className="fa-shake"/>
          :
          errorMsg === "Account Retrieval Error" ? <FontAwesomeIcon icon={faBug} className="fa-shake"/>
          :
          <FontAwesomeIcon icon={faCircleQuestion} className="fa-spin"/>
        }
        <br/>
        {errorMsg}
        </div>
      </div>
      <Modal className="register-modal text-center font" show={show} onHide={handleClose} centered>
        <Register handleClose={handleClose} />
        
      </Modal>
    </div>
  )
}

export default LoginInRegister