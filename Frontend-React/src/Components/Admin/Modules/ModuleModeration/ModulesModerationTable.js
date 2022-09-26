import React from 'react';
import { useState } from 'react';
import ModulesModerationTableModal from "./ModulesModerationTableModal";
import { useStateValue } from '../../../../Functionality/StateProvider';

export default function ModulesModerationTable({ parentToChild }) {



  const [{ defaultModule, user } ] = useStateValue();

  const [showModuleMenu, setShowModuleMenu] = useState(false);
  const [module, setModule] = useState(defaultModule);

  function showModuleModal(module) {
      setModule(module)
      setShowModuleMenu(true);
  }

  return (
    <div>
      <div className="table-container">
        <ul className="responsive-table">
          <li className="table-header shadow">
            <div className="col module-col-1">ID</div>
            <div className="col module-col-1">Code</div>
            <div className="col module-col-2">Name</div>
            {/* optionally render edit button based on if user is admin or not */}
            <div className="col module-col-1">Load</div>
          </li>
          {parentToChild.map((module, index) => (
            <li className="table-Row" key={index}>
              <div className="col module-col-1" data-label="id">{module.id}</div>
              <div className="col module-col-1" data-label="id">{module.code}</div>
              <div className="col module-col-2" data-label="content">{module.name}</div>
              <div className="col module-col-1" data-label="load">
                  <button onClick={() => showModuleModal(module)}> X </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
        <ModulesModerationTableModal module={module} setModule={setModule} 
        showModuleMenu={showModuleMenu} setShowModuleMenu={setShowModuleMenu} />
    </div>
  );
}


           {/* optionally render edit button based on if user is admin or not */}
              {/* { 
                module.admins.map((admin, index) => (admin.id === user.id)
                ?
                <div className="col module-col-1" data-label="load" key={index}>
                  <Link to={{ pathname: `/Module/Edit/${module.id}`}}>
                    <button> X </button>
                  </Link>
                </div>
                :
                <div className="col module-col-1" data-label="load" key={index}><button> 0 </button></div>
              )} */}
              {/* <div className="col module-col-1" data-label="load">
                <Link to={{ pathname: `/Module/Edit/${module.id}`}}>
                  <button> X </button>
                </Link>
              </div> */}