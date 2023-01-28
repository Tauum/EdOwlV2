import { Link } from 'react-router-dom'
import React from 'react';
import { useState } from 'react';

export default function SwipesModerationTable({ parentToChild }) {

  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="table-container">
        <ul className="responsive-table">
          <li className="table-header shadow">
            <div className="col col-10">Id</div>
            <div className="col col-2">Title</div>
            <div className="col col-3">Module</div>
            <div className="col col-9">Date</div>
            <div className="col col-4">Hidden</div>
            <div className="col col-5">Load</div>
          </li>
          {parentToChild.map((swipe, index) => (
            <li className="table-Row" key={index}>
              <div className="col col-10" data-label="id">{swipe.id}</div>
              <div className="col col-2" data-label="content">{swipe.title}</div>
              <div className="col col-3" data-label="content">{swipe.moduleCode? swipe.moduleCode : "N/A" }</div>
              <div className="col col-9" data-label="generatedDate">{swipe.generatedDate}</div>
              <div className="col col-4" data-label="generatedDate">{swipe.hidden ? <img className="icons" src="/Image/Icons/Check.svg" alt="checkmark" /> : <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />}</div>
              <div className="col col-5" data-label="load">
                <Link to={{ pathname: `/Admin/Swipe/Edit/${swipe.id}`}}>
                  <button> X </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}