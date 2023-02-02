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
        <p className='admin-information-details'>To moderate content for a specific module, select from the module section above. </p>
      </div>

      <br/>
      <QuizzesModeration className="quizzes"/>
      <ExtrasModeration className="extras" />
      <PropagatesModeration className="propagates" />

      {/* 
      <HangmanModeration className="hangmans" />
      <MatchModeration className="matches" />
      <BlankFillModeration className="blankFills" />*/}


    </div>
  );
}

