import React from 'react';
import "./Admin.css"
import QuizzesModeration from './Quizzes/QuizzesModeration';

// import HangmanModeration from "./Hangmans/HangmanModeration";
// import BlogModeration from "./Blogs/BlogModeration";
// import BlankFillModeration from "./BlankFill/BlankFillModeration";
import UsersModeration from './Users/UsersModeration';
import UpdatesModeration from './Updates/UpdatesModeration';
import ExtrasModeration from './Extras/ExtrasModeration';
// import MatchModeration from './Match/MatchModeration';

export default function AdminDashboard2() {

  return (
    <div className='admin'>
      <br /><br /><br /><br /><br /><br />
      {/* 
      <BlogModeration className="blogs" /> */}
      <ExtrasModeration className="extras" />
      <UpdatesModeration className="updates" />
      
      <UsersModeration className="users" />
    </div>
  );
}

