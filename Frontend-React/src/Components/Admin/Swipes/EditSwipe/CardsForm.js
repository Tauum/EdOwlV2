import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useStateValue } from '../../../../Functionality/StateProvider';

function CardsForm({ swipe, setSwipe, showCards, setShowCards }) {

  const [{ initialCard }] = useStateValue();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleUpdateCardScore = (e) => {
    setSwipe({ ...swipe, cards: swipe.cards.map((child, index) => index === selectedCardIndex ? { ...child, value: parseInt(e.target.value) } : child) })
  }

  useEffect(() => {
    setSwipe((prev) => {
      const currValue = prev.value;
      const newValue = swipe.cards?.reduce((total, card) => (total = total + card.value), 0) || 0;
      if (newValue === currValue) return prev;
      return { ...swipe, value: newValue };
    });
  }, [swipe]);

  const handleUnloadCard = (card) => { setSelectedCardIndex(null); };

  const handleRemoveCard = (selectedCardIndex) => {
    setSwipe((prev) => ({ ...prev, cards: prev.cards.filter((element, index) => index !== selectedCardIndex) }));
    setSelectedCardIndex(null);
  };


  const handleAddCard = () => {
    setSwipe((prev) => ({ ...prev, cards: prev.cards.concat(initialCard) }));
  }

  const handleEditCard = (selectedCardIndex) => {
    setSelectedCardIndex(swipe.cards.indexOf(selectedCardIndex));
  };

  const handleCloseCards = () => {
    setSelectedCardIndex(null);
    setShowCards(false);
  }

  const handleCardCorrect = (value) => {
    setSwipe({
        ...swipe, cards: swipe.cards.map((card, index) => {
            if (index === selectedCardIndex) {
                return { ...card, correct: value };
            }
            return card;
        })
    })
}

  return (
    <Modal className="font" show={showCards} onHide={handleCloseCards} centered backdrop="static">
      <div className="card text-center shadow">
        <div className="card-header"> </div>
        <div className="card-body font">
          {selectedCardIndex === null ?
            <div>
              <h2>Cards</h2>
              <Button className="btn shadow" variant="success" onClick={handleAddCard}>Add</Button>
              <div className="edit-quiz-section">
                <ul className="edit-quiz-list">
                  {swipe.cards?.map((card, index) => (
                    <li key={index} className="edit-quiz-questions-entry small-scale shadow">
                      <div className="edit-question-entry-text">
                        <small className="edit-question-entry-name">{card.question !== "" ? card.question : "New"}</small>
                        <br />
                        <small>- {card.value} value</small>
                        <br />
                      </div>
                      <Button className='btn shadow edit-quiz-select tiny-scale' variant="warning" onClick={() => handleEditCard(card)}> X </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="btn shadow" variant="secondary" onClick={handleCloseCards}>Close</Button>
            </div>
            :
            <form className='edit-page-form'>
              <div>
                <Row className='edit-page-form-row'>
                  <Col>
                    <label htmlFor="Title">Question</label>
                    <br />
                    <input type="text" id="question" name="question" className="edit-input shadow"
                      value={swipe.cards[selectedCardIndex].question}
                      onChange={(e) => setSwipe({ ...swipe, cards: swipe.cards.map((child, index) => index === selectedCardIndex ? { ...child, question: e.target.value } : child) })} />
                  </Col>
                  <Col>
                    <label htmlFor="Value">Score</label>
                    <br />
                    <input type="number" id="Value" name="Value" className="edit-input shadow" min="0"
                      value={swipe.cards[selectedCardIndex].value}
                      onChange={(e) => { handleUpdateCardScore(e) }} />
                  </Col>
                  <Col>
                    <label htmlFor="ImageURL">Image URL</label>
                    <br />
                    <input type="text" id="ImageURL" name="ImageURL" className="edit-input shadow" min="0"
                      value={swipe.cards[selectedCardIndex].imageURL}
                      onChange={(e) => setSwipe({ ...swipe, cards: swipe.cards.map((child, index) => index === selectedCardIndex ? { ...child, imageURL: e.target.value } : child) })} />
                  </Col>
                </Row>
                <Row className='edit-page-form-row edit-page-form-row-description'>
                  <Col>
                    <label htmlFor="Description">Sub-text</label>
                    <br />
                    <textarea name="description" id="description" className="edit-input-description shadow"
                      value={swipe.cards[selectedCardIndex].subText}
                      onChange={(e) => setSwipe({ ...swipe, cards: swipe.cards.map((child, index) => index === selectedCardIndex ? { ...child, subText: e.target.value } : child) })} />
                  </Col>
                </Row>
                
               <Row>
               <div className="edit-page-hidden-radio">
                        <label htmlFor="Value">Correct</label>
                        <div>
                            <label htmlFor="hidden">Yes </label>
                            <input type="radio" id="hide" name="hidden" className="shadow"
                                checked={swipe.cards[selectedCardIndex].correct === true}
                                value={true} onChange={(e) => handleCardCorrect(true)}
                            />
                        </div>
                        <div>
                            <label htmlFor="hidden">No </label>
                            <input type="radio" id="hide" name="hidden" className="shadow"
                                checked={swipe.cards[selectedCardIndex].correct === false}
                                value={false} onChange={(e) => handleCardCorrect(false)}
                            />
                        </div>
                    </div>
                </Row> 
                
                
                <Row className='edit-page-form-row edit-page-form-row-description'>
                  <Col>
                    <label htmlFor="Description">Review explaination</label>
                    <br />
                    <textarea name="description" id="description" className="edit-input-description shadow"
                      value={swipe.cards[selectedCardIndex].explaination}
                      onChange={(e) => setSwipe({ ...swipe, cards: swipe.cards.map((child, index) => index === selectedCardIndex ? { ...child, explaination: e.target.value } : child) })} />
                  </Col>
                </Row>
                
                <br />
                <Button className="btn shadow" variant="danger" onClick={() => handleRemoveCard(selectedCardIndex)}>Delete</Button>
                <Button className="btn shadow" variant="success" onClick={handleUnloadCard}>Unload</Button>
              </div>
            </form>
          }
        </div>
      </div>
    </Modal>

  )
}

export default CardsForm