import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Axios from '../../Functionality/Axios';
import { useStateValue } from '../../Functionality/StateProvider';
import { baseDeleteRequest, baseGetRequest, postQuickNote } from '../../Functionality/Requests';

export default function QuickNotes() {

    const [quickNotes, setQuickNotes] = useState([])
    const [submitQuickNote, setSubmitQuickNote] = useState({ content: "" })
    const [refresh, setRefresh] = useState(false)

    const [{ user }] = useStateValue();

    useEffect(() => {
        fetchData();
    }, [])


    useEffect(() => {
        if (refresh) {
            fetchData();
            setRefresh(false)
        }
    }, [refresh])

    async function fetchData() {
        setQuickNotes(await baseGetRequest(`QuickNotes/getAllForUser/${user.id}`))
    }

    const handleDeleteQuickNote = async (note) => {
        await baseDeleteRequest(`QuickNotes/delete/${note.id}`)
        setRefresh(true)
    }

    const postRequest = async (submitQuickNote) => {
        if (submitQuickNote.content !== "" && submitQuickNote.content.length < 100) {
            var request = await postQuickNote({ content: submitQuickNote.content, userId: user.id });
            console.log(request)
            if (request === 201) {
                setSubmitQuickNote({ content: "" })
                setRefresh(true)
            }
        }
    }

    return (
        <div className='nav-note-complete'>
            <Form className="d-flex nav-note-form">
                <input type="text" id="title" name="title" className='nav-note-input' value={submitQuickNote.content}
                    onChange={(e) => setSubmitQuickNote({ ...submitQuickNote, content: e.target.value })} max="10" />
                <Button variant="outline-secondary" className="nav-note-submit btn-warning" onClick={() => { postRequest(submitQuickNote) }} >Add</Button>
            </Form>
            <ul className='nav-note-list'>
                {quickNotes.map((quickNote, index) => (
                    <li key={index} className='note-elemenet' >{index + 1} - {quickNote.content}
                        <Button className="btn-close nav-note-delete" onClick={() => { handleDeleteQuickNote(quickNote) }}> </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}