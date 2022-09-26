import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useStateValue } from '../../../../Functionality/StateProvider';
import AnswerForm from './AnswerForm'

function QuestionForm({ quiz, setQuiz, showQuestions, setShowQuestions }) {

  const [{ initialQuestion, initialAnswer }] = useStateValue();


  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)

  const handleUpdateQuestionScore = (e) => {
    setQuiz({ ...quiz, questions: quiz.questions.map((child, index) => index === selectedQuestionIndex ? { ...child, value: parseInt(e.target.value) } : child) })
  }

  useEffect(() => {
    setQuiz((prev) => {
      const currValue = prev.value;
      const newValue = quiz.questions?.reduce((total, question) => (total = total + question.value), 0) || 0;
      if (newValue === currValue) return prev;
      return { ...quiz, value: newValue };
    });
  }, [quiz]);

  const handleEditAnswer = (selectedAnswerIndex) => {
    setSelectedAnswerIndex(quiz.questions[selectedQuestionIndex].answers.indexOf(selectedAnswerIndex))
  };

  const handleAddAnswer = () => {
    setQuiz((prev) => ({
      ...quiz, questions: quiz.questions.map((question, index) => {
        if (index === selectedQuestionIndex) { return { ...question, answers: question.answers.concat(initialAnswer) }; } return question;
      })
    }));
  }

  const handleUnloadQuestion = (question) => { setSelectedQuestionIndex(null); };

  const handleRemoveQuestion = (selectedQuestionIndex) => {
    setQuiz((prev) => ({ ...prev, questions: prev.questions.filter((element, index) => index !== selectedQuestionIndex) }));
    setSelectedQuestionIndex(null);
  };


  const handleAddQuestion = () => {
    setQuiz((prev) => ({ ...prev, questions: prev.questions.concat(initialQuestion) }));
  }

  const handleEditQuestion = (selectedQuestionIndex) => {
    setSelectedQuestionIndex(quiz.questions.indexOf(selectedQuestionIndex));
  };

  const handleCloseQuestions = () => {
    setSelectedQuestionIndex(null);
    setShowQuestions(false);
  }

  return (
    <Modal className="font" show={showQuestions} onHide={handleCloseQuestions} centered backdrop="static">
      <div className="card text-center shadow">
        <div className="card-header"> </div>
        <div className="card-body">
          {selectedQuestionIndex === null ? 
            <div>
              <h2>Questions</h2>
              <Button className="btn shadow" variant="success" onClick={handleAddQuestion}>Add</Button>
              <div className="edit-quiz-section">
                <ul className="edit-quiz-list">
                  {quiz.questions?.map((question, index) => (
                    <li key={index} className="edit-quiz-questions-entry small-scale shadow">
                      <div className="edit-question-entry-text">
                        <small className="edit-question-entry-name">{question.question}</small>
                        <br />
                        <small>- {question.answers.length} answers - {question.value} value</small>
                        <br />
                      </div>
                      <Button className='btn shadow edit-quiz-select tiny-scale' variant="warning" onClick={() => handleEditQuestion(question)}> X </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="btn shadow" variant="secondary" onClick={handleCloseQuestions}>Close</Button>
            </div>
            :
              <form className='edit-page-form'>
                {selectedAnswerIndex === null ?
                  <div>
                    <Row className='edit-page-form-row'>
                      <Col>
                        <label htmlFor="Title">Question</label>
                        <br />
                        <input type="text" id="question" name="question" className="edit-input shadow"
                          value={quiz.questions[selectedQuestionIndex].question}
                          onChange={(e) => setQuiz({ ...quiz, questions: quiz.questions.map((child, index) => index === selectedQuestionIndex ? { ...child, question: e.target.value } : child) })} />
                      </Col>
                      <Col>
                        <label htmlFor="Value">Score</label>
                        <br />
                        <input type="number" id="Value" name="Value"  className="edit-input shadow" min="0"
                          value={quiz.questions[selectedQuestionIndex].value}
                          onChange={(e) => { handleUpdateQuestionScore(e) }} />
                      </Col>
                    </Row>
                    <Row className='edit-page-form-row edit-page-form-row-description'>
                      <Col>
                        <label htmlFor="Description">Review explaination</label>
                        <br />
                        <textarea name="description" id="description" className="edit-input-description shadow"
                          value={quiz.questions[selectedQuestionIndex].explaination}
                          onChange={(e) => setQuiz({ ...quiz, questions: quiz.questions.map((child, index) => index === selectedQuestionIndex ? { ...child, explaination: e.target.value } : child) })} />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <div className="edit-quiz-section">
                        <h4>Answers</h4>
                        <Button className="btn shadow" variant="success" onClick={handleAddAnswer}>Add</Button>
                        <div className="edit-quiz-section">
                          <ul className="edit-quiz-list edit-quiz-answers-list">
                            {quiz.questions[selectedQuestionIndex].answers?.map((answer, index) => (
                              <li key={index} className="edit-quiz-questions-entry small-scale shadow">
                                <div className="edit-question-entry-text">
                                  <small className="edit-question-entry-name">{answer.content}</small>
                                  <br />
                                  <small>Correct - {answer.correct ? "true" : "false"}</small>
                                  <br />
                                </div>
                                <Button className='btn shadow edit-quiz-select tiny-scale' variant="warning" onClick={() => handleEditAnswer(answer)}> X </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Row>

                    <Button className="btn shadow" variant="danger" onClick={() => handleRemoveQuestion(selectedQuestionIndex)}>Delete</Button>
                    <Button className="btn shadow" variant="success" onClick={handleUnloadQuestion}>Unload</Button>
                  </div>
                  :
                  <div>
                    <AnswerForm quiz={quiz} setQuiz={setQuiz} selectedQuestionIndex={selectedQuestionIndex} selectedAnswerIndex={selectedAnswerIndex} setSelectedAnswerIndex={setSelectedAnswerIndex} />
                  </div>
                }
              </form>
            }
        </div>
      </div>
    </Modal>

  )
}

export default QuestionForm