import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useStateValue } from './Functionality/StateProvider';
import "./App.css";
import EditExtra from './Components/Admin/Extras/EditExtra/EditExtra';
import { baseGetRequest } from './Functionality/Requests';

import LoginRegister from './Components/LoginRegister/LoginRegister';
import Home from "./Components/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import UserNavigation from "./Components/Navigation/UserNavigation";
import ElevatedNavigation from "./Components/Navigation/ElevatedNavigation";
import InitialRegister from './Components/InitialRegister/InitialRegister';

import Swipe from './Components/Activities/Swipe/Swipe';
import Propagate from './Components/Activities/Propagate/Propagate';
import Quiz from './Components/Activities/Quiz/Quiz';
import Extra from "./Components/Activities/Extra/Extra";
import Shifter from "./Components/Activities/Shifter/Shifter";

import Admin from './Components/Admin/Admin';
import Admin2 from './Components/Admin/Admin2';

import Dashboard from "./Components/Dashboard/Dashboard";
import Test from "./Components/Test/Test";
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/Admin/Users/EditProfile/EditProfile';
import EditQuiz from './Components/Admin/Quizzes/EditQuiz/EditQuiz';

import EditModule from './Components/Admin/Modules/EditModule/EditModule';

import EditUpdate from './Components/Admin/Updates/EditUpdate/EditUpdate';
import EditPropagate from './Components/Admin/Propagates/EditPropagate/EditPropagate';
import EditSwipe from './Components/Admin/Swipes/EditSwipe/EditSwipe';
import EditShifter from "./Components/Admin/Shifters/EditShifter/EditShifter"
import AboutUs from './Components/AboutUs/AboutUs';

import NotFound from './Functionality/Redirects/NotFound';
import Error from "./Functionality/Redirects/Error";

function App() {

  const [{ user }, dispatch] = useStateValue();
  const [loaded, setLoaded] = useState(false);
  const [routeAvailability, setRouteAvailability] = useState("");

  async function fetchData() {
    const whoAmI = await baseGetRequest("Auth/whoami")
    dispatch({ type: "SET_USER", user: whoAmI });
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (!user.email) {
      setRouteAvailability(0); // if not logged in
      setLoaded(true);
    }
    else {
      console.log(user)
      if (!user.initialRegister) {
        setRouteAvailability(1)  // if user not completed initialRegister
        setLoaded(true);
      }
      else {
        var temp = false;
        user.roles.forEach(element => {
          if (element.name === "ROLE_STAFF" || element.name === "ROLE_ADMIN") {
            setLoaded(true);
            temp = true;
            return setRouteAvailability(2) // if admin user
          }
        })
        if (!temp) {
          setLoaded(true);
          setRouteAvailability(3) // if default user
        }
      }
    }
  }, [user])

  if (!loaded) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={[<Navigation key={0} />, <Home key={1}/>]} key={0}/>
          <Route path="/Login" element={[<LoginRegister/>]} key={1}/>
          <Route path="*" element={[<NotFound/>]} />
        </Routes>
      </Router>
    )
  }
  else {
    if (routeAvailability === 0) { // default non-user
      return (
        <Router>
          <Routes>

          <Route path="*" element={[<NotFound/>]} />

            <Route path="/" element={[<Navigation key={0}/>, <Home key={1}/>]} />
            <Route path="/AboutUs" element={[<Navigation key={0} />, <AboutUs key={1}/>]} key={0}/>
            <Route path="/Login" element={[<LoginRegister />]} />

            <Route path="/Extra" element={[<Navigation key={0}/>, <Extra key={1}/>]} />
            <Route path="/Extra/:id" element={[<Navigation key={0}/>, <Extra key={1}/>]} />

            <Route path="/Swipe/:id" element={[<Swipe />]} />
            
            <Route path="/Propagate/:id" element={[<Propagate />]} />

            <Route path="/Shifter/:id" element={[<Shifter/>]} />

            <Route exact path="/Quiz/:id" element={[<Quiz />]} />

            <Route exact path="/Profile/:id" element={[<Navigation key={0}/>,<Profile key={1}/>]} />
            <Route path="/Error" element={[<Error />]} />
          </Routes>
        </Router>
      )
    }
    if (routeAvailability === 1) { // unregistered user
      return <div><InitialRegister /></div>
    }
    if (routeAvailability === 2) {  // admin user
      return (
        <Router>
          <Routes>

          <Route path="*" element={[<NotFound/>]} />

            <Route path="/" element={[<ElevatedNavigation key={0}/>, <Home key={1}/>]} />
            <Route path="/AboutUs" element={[<ElevatedNavigation key={0} />, <AboutUs key={1}/>]} key={0}/>

            <Route path="/Extra" element={[<ElevatedNavigation key={0}/>, <Extra key={1}/>]} />
            <Route path="/Extra/:id" element={[<ElevatedNavigation key={0}/>, <Extra key={1}/>]} />

            <Route path="/Swipe/:id" element={[<Swipe />]} />
            <Route path="/Propagate/:id" element={[<Propagate />]} />
            <Route exact path="/Quiz/:id" element={[<Quiz />]} />
            <Route path="/Shifter/:id" element={[<Shifter/>]} />
            
            <Route path="/Error" element={[<Error />]} />
            <Route path="/Dashboard" element={[<ElevatedNavigation key={0}/>, <Dashboard key={1}/>]} />

            <Route path="/Test" element={[<ElevatedNavigation key={0}/>,<Test key={1}/>]} />

            <Route path="/Profile" element={[<ElevatedNavigation key={0}/>,<Profile key={1}/>]} />
            <Route exact path="/Profile/:id" element={[<ElevatedNavigation key={0}/>,<Profile key={1}/>]} />
            <Route path="/Profile/Edit" element={[<EditProfile key={1}/>]} />
            <Route path="/Profile/:id/Admin-Edit" element={[<EditProfile key={1}/>]}/>
            
            <Route path="/Admin" element={[<ElevatedNavigation key={0}/>, <Admin key={1}/>]} />
            <Route path="/Admin2" element={[<ElevatedNavigation key={0}/>, <Admin2 key={1}/>]} />

            <Route path="/Module/:id/Edit" element={[<EditModule key={1}/>]}/>

            <Route path="/Quiz/Edit/:id" element={[<EditQuiz key={1}/>]}/>

            <Route path="/Admin/Quiz/New" element={[<EditQuiz key={1}/>]}/>
            <Route path="/Admin/Quiz/Edit/:id" element={[<EditQuiz key={1}/>]}/>

            <Route path="/Admin/Swipe/New" element={[<EditSwipe key={1}/>]}/>
            <Route path="/Admin/Swipe/Edit/:id" element={[<EditSwipe key={1}/>]}/>

            <Route path="/Admin/Shifter/New" element={[<EditShifter key={1}/>]}/>
            <Route path="/Admin/Shifter/Edit/:id" element={[<EditShifter key={1}/>]}/>

            <Route path="/Admin/Propagate/New" element={[<EditPropagate key={1}/>]}/>
            <Route path="/Admin/Propagate/Edit/:id" element={[<EditPropagate key={1}/>]}/>

            <Route path="/Admin/Extra/New" element={[<EditExtra key={1}/>]}/>
            <Route path="/Admin/Extra/Edit/:id" element={[<EditExtra key={1}/>]}/>

            <Route path="/Update/New" element={[<EditUpdate key={1}/>]}/>
            <Route path="/Update/Edit/:id" element={[<EditUpdate key={1}/>]}/>
          </Routes>
        </Router>
      )
    }
    if (routeAvailability === 3) { // default user
      return (
        <Router>
          <Routes>
            
            <Route path="*" element={[<NotFound/>]} />

            <Route path="/" element={[<UserNavigation key={0}/>, <Home key={1}/>]} />
            <Route path="/AboutUs" element={[<UserNavigation key={0} />, <AboutUs key={1}/>]} key={0}/>

            <Route path="/Extra" element={[<UserNavigation key={0}/>, <Extra key={1}/>]} />
            <Route path="/Extra/:id" element={[<UserNavigation key={0}/>, <Extra key={1}/>]} />

            <Route path="/Swipe/:id" element={[<Swipe />]} />
            <Route path="/Propagate/:id" element={[<Propagate />]} />
            <Route path="/Quiz/:id" element={[<Quiz />]} />
            <Route path="/Shifter/:id" element={[<Shifter/>]} />
            
            <Route path="/Error" element={[<Error />]} />
            <Route path="/Dashboard" element={[<UserNavigation key={0}/>, <Dashboard key={1}/>]} />
            <Route exact path="/Profile/:id" element={[<UserNavigation key={0}/>,<Profile key={1}/>]} />
            <Route path="/Profile" element={[<UserNavigation key={0}/>,<Profile key={1}/>]} />
            <Route path="/Profile/Edit" element={[<UserNavigation key={0}/>,<EditProfile key={1}/>]} />
          </Routes>
        </Router>
      )
    }
  }

}
export default App