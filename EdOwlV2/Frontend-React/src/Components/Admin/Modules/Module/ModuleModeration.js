import React from 'react';
import "../../Admin.css"

// import HangmanModeration from "./Hangmans/HangmanModeration";
// import BlankFillModeration from "./BlankFill/BlankFillModeration";


// import UsersModeration from '../../Users/UsersModeration';
// import UpdatesModeration from '../../Updates/UpdatesModeration';
// import ExtrasModeration from '../../Extras/ExtrasModeration';
// import QuizzesModeration from '../../Quizzes/QuizzesModeration';

import { useEffect } from 'react';
import { useStateValue } from '../../../../Functionality/StateProvider';
import { useParams } from 'react-router-dom';

// import ContactUsModeration from './ContactUs/ContactUsModeration';
// import MatchModeration from './Match/MatchModeration';

export default function Modules() {
  const params = useParams();
  const moduleId = params?.id;

  const [{ user }] = useStateValue();

  useEffect(() => {
    // get information for module
  },[])

  return (
    <div className='admin'>
      <br /><br /><br /><br /><br /><br />
      {/* <QuizzesModeration className="quizzes"/>



      <ExtrasModeration className="extras" />
      <UsersModeration className="users" />
      <UpdatesModeration className="announcement" /> */}

      {/* 
      <HangmanModeration className="hangmans" />
      <MatchModeration className="matches" />
      <BlankFillModeration className="blankFills" />
      <BlogModeration className="blogs" /> */}



      {/* <ContactUsModeration className="contactUs" /> */}
    </div>
  );
}

