import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Axios from '../../../Functionality/Axios';
import { baseDeleteRequest } from '../../../Functionality/Requests';

export default function ContactUsFormsModerationTable({ parentToChild, setParentToChildData }) {

  const [showContactForm, setShowContactForm] = useState(false);
  const handleClose = () => setShowContactForm(false);
  const [contactForm, setContactForm] = useState();

  function showList(contactForm) {
    setContactForm(contactForm)
    setShowContactForm(true);
  }

  async function handleDeleteContactFormButton() {
    await baseDeleteRequest(`Extras/delete/${contactForm.id}`);
    setParentToChildData(parentToChild.filter((element) => element.id !== contactForm.id))
    setShowContactForm(false);
}

  return (
    <div>
      <div className="table-container">
        <ul className="responsive-table">
          <li className="table-header shadow">
            <div className="col col-1">Name</div>
            <div className="col col-2">Email</div>
            <div className="col col-9">Date</div>
            <div className="col col-7">Load</div>
          </li>
          {parentToChild.map((contactForm, index) => (
            <li className="table-Row" key={index}>
              <div className="col col-1" data-label="content">{contactForm.name}</div>
              <div className="col col-2" data-label="content">{contactForm.email}</div>
              <div className="col col-9" data-label="generatedDate">{contactForm.generatedDate}</div>
              <div className="col col-7" data-label="delete">
                <button className="" onClick={() => showList(contactForm)}> X </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal className="font" show={showContactForm} onHide={handleClose} centered backdrop="static">
        <div className="card text-center shadow font">
          <div className="card-header"> </div>
          <div className="card-body">
            <h3>Name: {contactForm?.name}</h3>
            <h4>Email: {contactForm?.email}</h4>
            <h5>Submission date: {contactForm?.generatedDate}</h5>
            <p>Message: {contactForm?.message}</p>
            <Button className="btn moderation-button" variant="danger" onClick={handleDeleteContactFormButton}>Delete</Button>
            <Button className="btn moderation-button" variant="dark" onClick={handleClose}>Close</Button>
          </div>
        </div>
      </Modal>
    </div>

  );
}