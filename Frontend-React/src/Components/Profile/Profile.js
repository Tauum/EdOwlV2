import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useStateValue } from '../../Functionality/StateProvider';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Profile.css";
import Roles from './Roles';
import Dates from './Dates';
import Modules from './Modules';
import Badges from './Badges';
import Statistics from './Statistics';
import { redirectGetRequest } from '../../Functionality/Requests';
import QRGenerator from '../../Functionality/QRGenerator/QRGenerator';

function Profile() {
    const [{ user } ] = useStateValue();
    const params = useParams();
    const [profile, setProfile] = useState("");
    const navigate = useNavigate();
    const userId = params?.id || user.id;

    useEffect(() => {
        fetchData()
    }, [])
    
    async function fetchData() {
    setProfile(await redirectGetRequest(navigate,`Users/getUserProfileAndStatsById/${userId}`))
    }
      
    const EditHandler = () => {
    //    do a check in here to determine if the user is an admin 
        navigate('/Profile/Edit')
    }

    return (
        <div>
            {/* <br /><br /><br /> */}
            {/* profile:
      {JSON.stringify(params)}
      <br/>
      {profile.toString()} */}



            <div className='all-profile-contents font'>

                <div className='profile-frame-container'>
                    <img className='userPicture' src={`/Image/Avatars/${profile.avatar}.svg`} alt="profile avatar" />
                    <div className='profile-top'>
                        <Button className="profie-id shadow top-element" variant="warning">{profile.userInstitutionId ?
                            <div>{profile.userInstitutionId}</div> :
                            <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />
                        }
                        </Button>
                        <Button className="profie-edit shadow top-element" variant="warning" onClick={EditHandler}>Edit <FontAwesomeIcon icon={faPenToSquare} className="shadow" /> </Button>

                    </div>

                    <div className='profile-information'>
                        <Dates createdOn={profile.createdOn} DoB={profile.dob} />
                        <div className="profile-main-content">
                            <div className='profile-names'>
                                <h2>{profile?.firstName}</h2>
                                <h2>{profile?.lastName}</h2>
                            </div>

                            <br />

                            
                            <QRGenerator url={window.location.href}/>
                            <br />
                            <Roles roles={profile.roles} />

                            <Modules modules={profile.modules} />

                            <Badges statisticsList={profile.statisticsList} />
                            
                            <Statistics statisticsList={profile.statisticsList} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    // insert alternative if user not found

}

export default Profile