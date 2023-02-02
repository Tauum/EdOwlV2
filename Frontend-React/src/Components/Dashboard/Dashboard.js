import React, { useState, useEffect } from 'react'
import { Button, Modal} from 'react-bootstrap'
import Axios from '../../Functionality/Axios';
import { Link, useNavigate } from 'react-router-dom'
import { useStateValue } from '../../Functionality/StateProvider';
import "./Dashboard.css"
import RandomActivities from './Parts/RandomActivities';
import Profile from './Parts/Profile';
import LatestArticle from './Parts/LatestArticle';
import Modules from "./Parts/Modules/Modules"
import Feedback from './Parts/Feedback';
import Stats from './Parts/Stats';

function Dashboard() {


  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleClicked = async (e) => {

  }

  return (
    <div className='dashboard font'>
      <ul className='dashboard-list'>
        <div className="dashboard-row-1">
            <RandomActivities />
            <Profile />
            <LatestArticle />
        </div>

        <li className='dashboard-middle-element-center shadow tiny-scale'>
          <div className="dashboard-element-heading"><h1>Dashboard</h1></div>
          <small className='note'> 
          Welcome to your dashboard.
          <br />Here you will find relevant links to activities, modules & statistics.
          <br/>Occasionally we will ask you for feedback below. 
          <br/>While feedback is not mandatory,
          <br/>We find it integral in development and updates.
          </small>
          <br />
          <Button className='btn feed-submit tiny-scale' variant="secondary">Feed</Button>
          <br />
          <small className='note'> Coming soon... </small>
        </li>

        <div className="dashboard-row-2">
            <Modules modules={user.modules} />
            <Feedback />
            <Stats />
        </div>
      </ul>
    </div>
  )
}

export default Dashboard