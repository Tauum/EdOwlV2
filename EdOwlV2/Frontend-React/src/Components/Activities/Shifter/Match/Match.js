import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useEffect, useState } from 'react';
import { Button, Modal, ProgressBar, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Match.css';

export default function Match(props) {

    const [match, setMatch] = useState();
    const [missingParentData, setMissingParentData] = useState();
    const [executedSet, setExecutedSet] = useState();
    const [executedFetch, setExecutedFetch] = useState();
    const [explainations, setExplainations] = useState();
    const [titles, setTitles] = useState();
    const [correctVal, setCorrectVal] = useState();
    const [submittedMatch, setSubmittedMatch] = useState(false);

    const [timeTaken, setTimeTaken] = useState()
    const [initialDate, setInitialDate]=useState()

    const[rating, setRating] = useState(true)

    const [show, setShow] = useState(false);


    useEffect(() => {
        if (props.location.state) {
            setMatch(props.location.state)
            var startDate = Date()
            setInitialDate(startDate)

            setExplainations(props.location.state.definitions.map(definition => ({ id: definition.id, explaination: definition.explaination })));
            setTitles(props.location.state.definitions.map(definition => ({ id: definition.id, title: definition.title })));

            setExecutedFetch(true)
        }
        else {
            setMissingParentData(true)
        }
    }, [])

    function arrayShuffle(array) {
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [ array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    useEffect(() => {
        if (executedFetch) {
            setExplainations(arrayShuffle(explainations))
            setExecutedSet(true)
        }
    }, [executedFetch])



    const handleSubmitClicked = () => {
        var currentDate = new Date()
        var initial = new Date(initialDate) 
        var difference = Math.round((currentDate - initial) / 1000);
        setTimeTaken(difference)
        var correct = 0;
        var incorrect = 0;
        var score = 0;

        for (let i = 0; i < match.definitions.length; i++) {
            if (titles[i].id !== explainations[i].id) {
                incorrect++;
            }
            else {
                correct++;
                score = score + match.definitions[i].value
            }
        }
        setCorrectVal(correct)

        fetch (`${window.ipAddress.ip}/SubmittedMatch/add`,{
            method: "POST",  
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(
                { 
                    user : window.BackendUser,
                    matchTitle : match.title,
                    matchValue: match.value,
                    matchId: match.id,
                    incorrect : incorrect, 
                    correct: correct,
                    score : score,
                    timeTaken : difference,
                    generatedDate : currentDate,
                    rating: true
                }
            ) 
          })
        .then(res=>res.json())
        .catch(error =>{ 
        console.log("error: " + error);
        })
        .then((result)=>{
            setSubmittedMatch(result)
        })
        setShow(true)
    }

    function handleDragTitle(result) {
        if (!result.destination) return;

        const newTitles = Array.from(titles);
        const [reorderedTitles] = newTitles.splice(result.source.index, 1);
        newTitles.splice(result.destination.index, 0, reorderedTitles);
        setTitles(newTitles);
    }

    function handleDragExplaination(result) {
        if (!result.destination) return;
        const newExplainations = Array.from(explainations);
        const [reorderedExplainations] = newExplainations.splice(result.source.index, 1);
        newExplainations.splice(result.destination.index, 0, reorderedExplainations);
        setExplainations(newExplainations);
    }

    const HandleRatingClicked = () =>  {
        setRating(!rating)
      }

      useEffect(() => {
        if (submittedMatch !== false){
          fetch(`${window.ipAddress.ip}/SubmittedMatch/vote/${submittedMatch.id}/${rating}`,{ method: "PATCH"})
        }
    },[rating])

      if (missingParentData === true) {
        return (<Redirect to="/Dashboard"></Redirect>);
      }

    if (executedSet) {
        const resultPercentage = ((correctVal / match.definitions.length) * 100).toFixed(2)
        return (
            <div className='all-match-container body'>
                <div className="App">
                    <Row className='match-main-container'>
                        <Col className='title-container'>
                            <h1>Phrase</h1>
                            <DragDropContext onDragEnd={handleDragTitle}>
                                <Droppable droppableId="titles">
                                    {(provided) => (
                                        <ul className="titles-list" {...provided.droppableProps} ref={provided.innerRef}>
                                            {titles.map(({ id, title }, index) => {
                                                return (
                                                    <Draggable key={title} draggableId={title} index={index}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="all-match-element">
                                                                <p>
                                                                    {index} : {title}
                                                                </p>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Col>

                        <Col className='explainations-container'>
                            <h1>Definition</h1>
                            <DragDropContext onDragEnd={handleDragExplaination}>
                                <Droppable droppableId="explainations">
                                    {(provided) => (
                                        <ul className="explainations-list" {...provided.droppableProps} ref={provided.innerRef}>
                                            {explainations.map(({ id, explaination }, index) => {
                                                return (
                                                    <Draggable key={explaination} draggableId={explaination} index={index}>
                                                        {(provided) => (
                                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                                                className="all-match-element meaning-match-element">
                                                                <p>
                                                                    {index}. {explaination}
                                                                </p>
                                                            </li>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Col>
                    </Row>
                    <Button onClick={handleSubmitClicked} type="buton" className="btn btn-warning submit-match" id="submitbutton">Submit</Button>
                </div>


                <Modal className="article-modal" show={show}>
                    <div className="card text-center shadow">
                        <div className="card-header">
                            <div className="card-body">
                                <h4 className="card-title"> Your result is {resultPercentage} % <br/> ( {correctVal} of {match.definitions.length} ) </h4>
                            </div>
                            <ProgressBar className='progress-bar-success' animated now={resultPercentage} />
                            <h5> It took: {timeTaken} Seconds to complete! </h5>       

                            { resultPercentage >= 0 && resultPercentage <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>  }
                            { resultPercentage >= 17 && resultPercentage <= 33 ? <div><img className="shadow emoj" src="/Image/17-33.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 34 && resultPercentage <= 50 ? <div><img className="shadow emoj" src="/Image/34-50.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 51 && resultPercentage <= 66 ? <div><img className="shadow emoj" src="/Image/51-66.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 67 && resultPercentage <= 83 ? <div><img className="shadow emoj" src="/Image/67-83.svg" alt="" /></div> : <div></div>  }
                            { resultPercentage >= 84 && resultPercentage <= 100 ? <div><img className="shadow emoj" src="/Image/84-100.svg" alt="" /></div> : <div></div>  }

                            <div className='rating-container'>
                                <h5>Cast your vote</h5>
                                <div onClick={HandleRatingClicked}>
                                    { rating === true ? 
                                    <img className="shadow emoj rating-button rating-up" src="/Image/thumb-up.svg" alt="" />
                                    :
                                    <img className="shadow emoj rating-button rating-down" src="/Image/thumb-down.svg" alt="" />
                                    }
                                </div>
                            </div>
                            {match.content !== null ? 
                                    <div className="card-footer text-muted"> 
                                        <div>{match.content}</div> 
                                    </div>
                                : <div></div>}
                            <br />
                            <Link to="/Dashboard"><Button variant="btn btn-dark otherbutton">Return</Button></Link>

                        </div>
                    </div>
                </Modal>
            </div>

        );
    }

    else {
        return (
            <div className='app'>
                aaaa
            </div>

        );
    }

}


