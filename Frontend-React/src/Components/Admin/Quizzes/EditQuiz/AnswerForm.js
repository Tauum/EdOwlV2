import React from 'react'
import { Button } from 'react-bootstrap'

function AnswerForm({ quiz, setQuiz, selectedQuestionIndex, selectedAnswerIndex, setSelectedAnswerIndex }) {

    const handleRemoveAnswer = () => {
        console.log(quiz.questions[selectedQuestionIndex].answers[selectedAnswerIndex])
        console.log(quiz.questions[selectedQuestionIndex].answers.filter((element, index) => index !== selectedAnswerIndex)) // this doesnt print with element missing

        setQuiz((prev) => ({
          ...prev, questions: prev.questions.map((question, x) => {
            if (x === selectedQuestionIndex) { return { ...question, answers: question.answers.filter((element, y) => y !== selectedAnswerIndex) }; }
            return question;
        })
      }));
      setSelectedAnswerIndex(null);
    };

    const handleUnloadAnswer = () => { setSelectedAnswerIndex(null); };

    const handleAnswerCorrect = (value) => {
        setQuiz({
            ...quiz, questions: quiz.questions.map((question, index) => {
                if (index === selectedQuestionIndex) {
                    return {
                        ...question, answers: question.answers.map((answer, index) => {
                            if (index === selectedAnswerIndex) {
                                return { ...answer, correct: value };
                            }
                            return answer;
                        })
                    };
                }
                return question;
            })
        })
    }

    return (
        <div>
            <div>
                <div>
                    <label htmlFor="Title">content</label>
                    <br />
                    <input type="text" id="question" name="question" className="edit-input shadow"
                        value={quiz.questions[selectedQuestionIndex].answers[selectedAnswerIndex].content}
                        onChange={(e) =>
                            setQuiz({
                                ...quiz,
                                questions: quiz.questions.map((question, index) => {
                                    if (index === selectedQuestionIndex) {
                                        return {
                                            ...question,
                                            answers: question.answers.map((answer, index) => {
                                                if (index === selectedAnswerIndex) {
                                                    return {
                                                        ...answer,
                                                        content: e.target.value
                                                    };
                                                }
                                                return answer;
                                            })
                                        };
                                    }
                                    return question;
                                })
                            })
                        } />
                </div>
                <div>
                    <div className="edit-page-hidden-radio">
                        <label htmlFor="Value">Correct</label>
                        <div>
                            <label htmlFor="hidden">Yes </label>
                            <input type="radio" id="hide" name="hidden" className="shadow"
                                checked={quiz.questions[selectedQuestionIndex].answers[selectedAnswerIndex].correct === true}
                                value={true} onChange={(e) => handleAnswerCorrect(true)}
                            />
                        </div>
                        <div>
                            <label htmlFor="hidden">No </label>
                            <input type="radio" id="hide" name="hidden" className="shadow"
                                checked={quiz.questions[selectedQuestionIndex].answers[selectedAnswerIndex].correct === false}
                                value={false} onChange={(e) => handleAnswerCorrect(false)}
                            />
                        </div>
                    </div>
                </div>

                <Button className="btn shadow" variant="danger" onClick={handleRemoveAnswer}>Delete</Button>
                <Button className="btn shadow" variant="success" onClick={handleUnloadAnswer}>Unload</Button>
            </div>
            <br />
        </div>
    )
}

export default AnswerForm