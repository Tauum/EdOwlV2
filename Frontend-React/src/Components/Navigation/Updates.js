import React, { useState, useEffect } from 'react';
import Axios from '../../Functionality/Axios';

export default function Updates() {

    const [updates, setUpdates] = useState([])
    const[errorMsg, setErrorMsg] = useState(false);

    useEffect(() => {
        const loadUpdates = async () => {
            try {
                const get_request = await Axios({
                    method: "get",
                    url: `${window.ipAddress.ip}/Updates/Recent`,
                    headers: { "Content-Type": "application/json" }
                })
                if (get_request.status === 200) { setUpdates(get_request.data) }
                else { setErrorMsg("Couldnt complete initial sign up in backend") }
            }
            catch (err) {  if (err) { setErrorMsg(err) } }
        }
        loadUpdates();
    }, [])

    useEffect(() => {
        if (updates.length <= 0) {
            var todayDate = new Date();
            var todayDateText = todayDate.getDate() + "/" + (todayDate.getMonth() + 1) + "/" + todayDate.getFullYear()
            if (errorMsg){ setUpdates([{ content: {errorMsg}, generatedDate: todayDateText, id: 1 }]) }
            else{  setUpdates([{ content: "There is currently no new updates", generatedDate: todayDateText, id: 1 }])  }
        }
    },[updates])

    return (
        <div className="update-container">
            <ul className="update-list">
                {updates.map((update, index) => (
                    <li key={index} className="update-element"><p>{update?.generatedDate} - {update?.content}</p></li>
                ))}

            </ul>
        </div>
    );

}
