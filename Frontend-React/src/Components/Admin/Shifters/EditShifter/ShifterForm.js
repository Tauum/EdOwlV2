import React from 'react'
import { Col, Row } from 'react-bootstrap'

function ShifterForm({shifter, setShifter}) {

  const handleShifterHidden = (value) => {
    setShifter({ ...shifter, hidden: value })
}

  return (
    <form className='edit-page-form'>
          <Row className='edit-page-form-row'>
            <Col>
              <label htmlFor="Title">Title</label>
              <br />
              <input type="text" id="title" name="title" className="edit-input shadow"
                value={shifter.title} onChange={(e) => setShifter({ ...shifter, title: e.target.value })} />
            </Col>
            <Col>
              <label htmlFor="Subject">Subject</label>
              <br />
              <input type="text" id="subject" name="title" className="edit-input shadow"
                value={shifter.subject} onChange={(e) => setShifter({ ...shifter, subject: e.target.value })} />
            </Col>
          </Row>

          <Row className='edit-page-form-row'>
            <Col>
              <label htmlFor="Value">Score</label>
              <br />
              <div  className="shadow edit-input edit-score">
                {shifter.value}
              </div>
            </Col>
          </Row>
          <Row className='edit-page-form-row edit-page-form-row-description'>
            <Col>
              <label htmlFor="Description">Description</label>
              <br />
              <textarea name="description" id="description" className="edit-input-description shadow"
                value={shifter.description} onChange={(e) => setShifter({ ...shifter, description: e.target.value })} />
            </Col>
            <Col>
              <label htmlFor="endContent">Post activity content</label>
              <br />
              <textarea name="content" id="content" className="edit-input-description shadow"
                value={shifter.endContent} onChange={(e) => setShifter({ ...shifter, endContent: e.target.value })} />
            </Col>
          </Row>
          <Row className='edit-page-form-row edit-page-form-row-description'>
           
          </Row>

          <label htmlFor="hide">Activity Hidden</label>

          <div className="edit-page-hidden-radio">
            <div>
              <label htmlFor="hidden">Yes</label>
              <input type="radio" id="hide" name="hidden" className="shadow"
                checked={shifter.hidden === true}
                value={true} onChange={(e) => handleShifterHidden(true)} />
            </div>
            <div>
              <label htmlFor="hidden">No</label>
              <input type="radio" id="hide" name="hidden" className="shadow"
                checked={shifter.hidden === false}
                value={false} onChange={(e) => handleShifterHidden(false)} />
            </div>
          </div>
        </form>
  )
}

export default ShifterForm