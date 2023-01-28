import React from 'react';
import "./Admin.css"
import QuizzesModeration from './Quizzes/QuizzesModeration';

// import HangmanModeration from "./Hangmans/HangmanModeration";
// import BlogModeration from "./Blogs/BlogModeration";
// import BlankFillModeration from "./BlankFill/BlankFillModeration";
import UsersModeration from './Users/UsersModeration';
import UpdatesModeration from './Updates/UpdatesModeration';
import ExtrasModeration from './Extras/ExtrasModeration';
import ContactUsFormsModeration from './ContactUsForms/ContactUsFormsModeration';
import ModulesModeration from './Modules/ModuleModeration/ModulesModeration';
import PropagatesModeration from './Propagates/PropagatesModeration';
import SwipesModeration from './Swipes/SwipesModeration';
import ShiftersModeration from './Shifters/ShiftersModeration';
// import MatchModeration from './Match/MatchModeration';

export default function AdminDashboard() {

  return (
    <div className='admin font'>
    <h1 className='admin-header'>Admin Dashboard</h1>
     
      <ModulesModeration className="modules" />
      <UsersModeration className="users" />
      <UpdatesModeration className="announcement" />
      <ContactUsFormsModeration className="contactUs" />

      <br/>

      <div className='admin-information accordian-container shadow small-scale'>
        <h4 className='admin-information-header'>Activities moderation below are for application-wide access to all users.</h4>
        <p className='admin-information-details'>To moderate content for a specific module, navigate to a specific module area within the above section. </p>
      </div>

      <br/>
      <ExtrasModeration className="extras" />
      <QuizzesModeration className="quizzes"/>
      <SwipesModeration className="swipes"/>
      <PropagatesModeration className="propagates" />
      <ShiftersModeration className="shifters" />

      {/* 
      <HangmanModeration className="hangmans" />
      <MatchModeration className="matches" />
      <BlankFillModeration className="blankFills" />*/}


    </div>
  );
}

