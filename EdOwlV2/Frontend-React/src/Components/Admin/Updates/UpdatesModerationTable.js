import { Link } from 'react-router-dom'
import React from 'react';
import { useState } from 'react';

export default function UpdatesModerationTable({ parentToChild }) {

  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="table-container">
        <ul className="responsive-table">
          <li className="table-header shadow">
            <div className="col col-10">ID</div>
            <div className="col col-2">Content</div>
            <div className="col col-9">Date</div>
            <div className="col col-4">Load</div>
          </li>
          {parentToChild.map((update, index) => (
            <li className="table-Row" key={index}>
              <div className="col col-10" data-label="id">{update.id}</div>
              <div className="col col-2" data-label="content">{update.content}</div>
              <div className="col col-9" data-label="generatedDate">{update.generatedDate}</div>
              <div className="col col-4" data-label="load">
                <Link to={{ pathname: `/Update/Edit/${update.id}`}}>
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