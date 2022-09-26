import { Button, Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../../../Functionality/StateProvider';
import { Link, useNavigate } from 'react-router-dom';


function Profile() {

    const [{ user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [rolesString, setRolesString] = useState("");

    useEffect(() => {
        var tempWord = "";
        var thing = user?.roles.map(((role) => { tempWord += ", " + role.name.toLowerCase().slice(5) })) // why is this unassigned? 
        tempWord = tempWord.slice(2)
        setRolesString(tempWord);
    }, [])

    return (
        <li>
            <div className="dashboard-element-center shadow tiny-scale top-center-element">
                <h4 className="dashboard-element-heading">Profile</h4>
                <div className="profile-info">

                    <img className='profile-img shadow small-scale' src={`/Image/Avatars/${user.avatar}.svg`} />

                    <div className='profile-preview-text'>
                        {(user?.firstName.toString() + user?.lastName.toLowerCase()).length < 20 ?
                            <h6 className="profile-preview-line">{user?.firstName + " " + user?.lastName}</h6>
                            :
                            <div>
                                <h6 className="profile-preview-line">{user?.firstName}</h6>
                                <h6 className="profile-preview-line">{user?.lastName}</h6>
                            </div>
                        }
                        <h6 className="profile-preview-line">{user?.userInstitutionId}</h6>
                        <h6 className="profile-preview-line roles-string">{rolesString} </h6>
                    </div>
                    <Link to={"/Profile"}>
                        <button className='btn profile-submit shadow'>View</button>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default Profile