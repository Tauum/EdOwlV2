import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
function RandomActivities() {

  const getRequest = async () => {

    // try {
    //     const user_response = await Axios.get(`${window.ipAddress.ip}/Users/getUserProfileAndStatsById/${userId}`);
    //     if (user_response.status === 200 && user_response.data !== null) { setProfile(user_response.data); }
    //     else {
    //         // set error here
    //         console.log("else")
    //     }
    //     console.log(user_response)
    // }
    // catch (err) { console.log(err) }
}

useEffect(() => {
  getRequest()
  },[])


  return (
    <li>
      <div className="dashboard-element tiny-scale top-left-element">
        <h4 className="dashboard-element-heading">Random activity selector</h4>
        <div className='activity-text'>
          <small className='note'> Quick select recent or view full list below  </small>
        </div>

        

        <Button className='btn activity-submit shadow' variant="danger">View more</Button>
      </div>
    </li>
  )
}

export default RandomActivities  