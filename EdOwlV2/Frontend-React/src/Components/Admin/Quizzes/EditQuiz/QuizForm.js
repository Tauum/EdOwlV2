import React from 'react'
import { Col, Row } from 'react-bootstrap'

function QuizForm({quiz, setQuiz}) {

  const handleQuizHidden = (value) => {
    setQuiz({ ...quiz, hidden: value })
}

  return (
    <form className='edit-page-form'>
          <Row className='edit-page-form-row'>
            <Col>
              <label htmlFor="Title">Title</label>
              <br />
              <input type="text" id="title" name="title" className="edit-input shadow"
                value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
            </Col>
            <Col>
              <label htmlFor="Subject">Subject</label>
              <br />
              <input type="text" id="subject" name="title" className="edit-input shadow"
                value={quiz.subject} onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })} />
            </Col>
          </Row>

          <Row className='edit-page-form-row'>
            <Col>
              <label htmlFor="Time-limit">Time limit <small>(seconds)</small></label>
              <br />
              <input type="number" id="Time-limit" name="Time-limit" className="edit-input shadow"
                value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} min="0" />
            </Col>
            <Col>
              <label htmlFor="Value">Score</label>
              <br />
              <div  className="shadow edit-input edit-score">
                {quiz.value}
              </div>
            </Col>
          </Row>
          <Row className='edit-page-form-row edit-page-form-row-description'>
            <Col>
              <label htmlFor="Description">Description</label>
              <br />
              <textarea name="description" id="description" className="edit-input-description shadow"
                value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
            </Col>
            <Col>
              <label htmlFor="endContent">Post activity content</label>
              <br />
              <textarea name="content" id="content" className="edit-input-description shadow"
                value={quiz.endContent} onChange={(e) => setQuiz({ ...quiz, endContent: e.target.value })} />
            </Col>
          </Row>
          <Row className='edit-page-form-row edit-page-form-row-description'>
           
          </Row>

          <label htmlFor="hide">Activity Hidden</label>

          <div className="edit-page-hidden-radio">
            <div>
              <label htmlFor="hidden">Yes</label>
              <input type="radio" id="hide" name="hidden" className="shadow"
                checked={quiz.hidden === true}
                value={true} onChange={(e) => handleQuizHidden(true)} />
            </div>
            <div>
              <label htmlFor="hidden">No</label>
              <input type="radio" id="hide" name="hidden" className="shadow"
                checked={quiz.hidden === false}
                value={false} onChange={(e) => handleQuizHidden(false)} />
            </div>
          </div>
        </form>
  )
}

export default QuizForm