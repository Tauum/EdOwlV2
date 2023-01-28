import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { useStateValue } from '../../../../Functionality/StateProvider';

function DefinitionsForm({ shifter, setShifter, showDefinitions, setShowDefinitions }) {

  const [{ initialDefinition }] = useStateValue();
  const [selectedDefinitionIndex, setSelectedDefinitionIndex] = useState(null);

  const handleUpdateDefinitionScore = (e) => {
    setShifter({ ...shifter, definitions: shifter.definitions.map((child, index) => index === selectedDefinitionIndex ? { ...child, value: parseInt(e.target.value) } : child) })
  }

  useEffect(() => {
    setShifter((prev) => {
      const currValue = prev.value;
      const newValue = shifter.definitions?.reduce((total, definition) => (total = total + definition.value), 0) || 0;
      if (newValue === currValue) return prev;
      return { ...shifter, value: newValue };
    });
  }, [shifter]);

  const handleUnloadDefinition = (definition) => { setSelectedDefinitionIndex(null); };

  const handleRemoveDefinition = (selectedDefinitionIndex) => {
    setShifter((prev) => ({ ...prev, definitions: prev.definitions.filter((element, index) => index !== selectedDefinitionIndex) }));
    setSelectedDefinitionIndex(null);
  };


  const handleAddDefinition = () => {
    setShifter((prev) => ({ ...prev, definitions: prev.definitions.concat(initialDefinition) }));
  }

  const handleEditDefinition = (selectedDefinitionIndex) => {
    setSelectedDefinitionIndex(shifter.definitions.indexOf(selectedDefinitionIndex));
  };

  const handleCloseDefinitions = () => {
    setSelectedDefinitionIndex(null);
    setShowDefinitions(false);
  }

  const handleDefinitionCorrect = (value) => {
    setShifter({
        ...shifter, definitions: shifter.definitions.map((definition, index) => {
            if (index === selectedDefinitionIndex) {
                return { ...definition, correct: value };
            }
            return definition;
        })
    })
}

useEffect(() => {console.log(shifter)},[shifter])

  return (
    <Modal className="font" show={showDefinitions} onHide={handleCloseDefinitions} centered backdrop="static">
      <div className="definition text-center shadow">
        <div className="definition-header"> </div>
        <div className="card-body font">
          {selectedDefinitionIndex === null ?
            <div>
              <h2>Definitions</h2>
              <Button className="btn shadow" variant="success" onClick={handleAddDefinition}>Add</Button>
              <div className="edit-quiz-section">
                <ul className="edit-quiz-list">
                  {shifter.definitions?.map((definition, index) => (
                    <li key={index} className="edit-quiz-questions-entry small-scale shadow">
                      <div className="edit-question-entry-text">
                        <small className="edit-question-entry-name">{definition.title !== "" ? definition.title : "New"}</small>
                        <br />
                        <small>- {definition.value} value</small>
                        <br />
                      </div>
                      <Button className='btn shadow edit-quiz-select tiny-scale' variant="warning" onClick={() => handleEditDefinition(definition)}> X </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="btn shadow" variant="secondary" onClick={handleCloseDefinitions}>Close</Button>
            </div>
            :
            <form className='edit-page-form'>
              <div>
                <Row className='edit-page-form-row'>
                  <Col>
                    <label htmlFor="Title">Title</label>
                    <br />
                    <input type="text" id="question" name="question" className="edit-input shadow"
                      value={shifter.definitions[selectedDefinitionIndex].title}
                      onChange={(e) => setShifter({ ...shifter, definitions: shifter.definitions.map((child, index) => index === selectedDefinitionIndex ? { ...child, title: e.target.value } : child) })} />
                  </Col>
                </Row>
                <Row className='edit-page-form-row edit-page-form-row-description'>
                  <Col>
                    <label htmlFor="Description">Answer</label>
                    <br />
                    <textarea name="description" id="description" className="edit-input-description shadow"
                      value={shifter.definitions[selectedDefinitionIndex].answer}
                      onChange={(e) => setShifter({ ...shifter, definitions: shifter.definitions.map((child, index) => index === selectedDefinitionIndex ? { ...child, answer: e.target.value } : child) })} />
                  </Col>
                </Row>
                <Row>
                    <Col>
                    <label htmlFor="Value">Score</label>
                    <br />
                    <input type="number" id="Value" name="Value" className="edit-input shadow" min="0"
                      value={shifter.definitions[selectedDefinitionIndex].value}
                      onChange={(e) => { handleUpdateDefinitionScore(e) }} />
                  </Col>
                </Row>
                <Row className='edit-page-form-row edit-page-form-row-description'>
                  <Col>
                    <label htmlFor="Description">Review explaination</label>
                    <br />
                    <textarea name="description" id="description" className="edit-input-description shadow"
                      value={shifter.definitions[selectedDefinitionIndex].explaination}
                      onChange={(e) => setShifter({ ...shifter, definitions: shifter.definitions.map((child, index) => index === selectedDefinitionIndex ? { ...child, explaination: e.target.value } : child) })} />
                  </Col>
                </Row>
                <br />
                <Button className="btn shadow" variant="danger" onClick={() => handleRemoveDefinition(selectedDefinitionIndex)}>Delete</Button>
                <Button className="btn shadow" variant="success" onClick={handleUnloadDefinition}>Unload</Button>
              </div>
            </form>
          }
        </div>
      </div>
    </Modal>

  )
}

export default DefinitionsForm