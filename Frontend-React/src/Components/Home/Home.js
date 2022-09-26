import "./Home.css"
import { Button } from 'react-bootstrap'
import React, { useState } from 'react';
import { contactUsPostRequestWithoutCredentails } from "../../Functionality/Requests";
import { useStateValue } from "../../Functionality/StateProvider";
import { useNavigate } from "react-router-dom";
import QRGenerator from "../../Functionality/QRGenerator/QRGenerator";

export default function Home() {

    const navigate = useNavigate();
    const [{ user }] = useStateValue();

    const [contactUs, setContactUs] = useState({ name: "", message: "", email: "", generatedDate: "" });
    const [successful, setSuccessful] = useState(false);

    const postRequest = async () => {
        if (contactUs.name !== "" && contactUs.email !== "" && contactUs.message !== "") {
            contactUsPostRequestWithoutCredentails(
                "ContactForms/add", 
                {name: contactUs.name, email: contactUs.email, message: contactUs.message }
            )
            setContactUs({ name: "", message: "", email: "", generatedDate: "" });
            setSuccessful(true);
        }
    }

    const loginButton = () => {
        if (!user.email) {
            navigate('/Login')
        }
    }
    const dashboardButton = () => {
        if (user.email) {
            navigate('/Dashboard')
        }
    }

    const updatesButton = () => {
        console.log("notes")
        // figure out how to open updates from here
    }

    const extraButton = () => {
        if (!user.email) {
            navigate('/Extra')
        }
    }

    const notesButton = () => {
        console.log("notes")
        // figure out how to open notes from here
    }

    const profileButton = () => {
        if (user.email) {
            navigate('/Profile')
        }
    }

        return (
            <div className="home font">
                <section className="hero-section">
                    <img className="edowl-logo shadow small-scale" src="/Image/baselogo.svg" alt="" />

                    <div className="text">
                        <div className="home-heading">
                            <h1>Ed <span /> Owl<br />The HE digital learning companion app</h1>
                        </div>
                        <div className="home-description">
                            <p>Make your learning journey more interactive by using this game based learning app 
                                to engage with module specific formative tasks.<br/><br/> Ed Owl also enables you to check your learning progress 
                                and access supporting reading materials such as vlog, podcasts and more for your module!
                            </p>
                        </div>
                        <br />
                        <a href="https://youtu.be/N9efMxDuADI" className="btn btn-red shadow">Video</a>
                        <Button href="/AboutUs" className="btn btn-info shadow" variant="warning">More Information</Button>
                        <a href="https://forms.gle/PtLd3raF7q2WpnAH7" className="btn btn-dark shadow">Survey</a>
                        <br/>
                        <QRGenerator url={window.location.href}/>
                    </div>
                </section>

                <section className="features-section">

                    <h1 className="home-heading">Ed Owl Features</h1>

                    <p className="home-description">This app is designed to make blended learning both fun & engaging using games with additional built in features. </p> 
                    <ul className="features-list">
                        
                        <button className="features-element shadow small-scale" onClick={loginButton}>
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/hat.svg" alt="Login Register" />
                                <h2 className="feature-title">Getting started</h2>
                                <p className="feature-text">Open your account in seconds by clicking login within the applications navigation-bar and complete the sign-up forms.</p>
                            </div>
                        </button>

                        <button className="features-element shadow small-scale" onClick={dashboardButton} >
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/games-and-learning.svg" alt="Dashboard" />
                                <h2 className="feature-title">Games, learning and HE</h2>
                                <p className="feature-text">Browse or participate in subject specific tasks at your own time.
                                <br /> Available within "Dashboard" area.</p>
                            </div>
                        </button>

                        <button className="features-element shadow small-scale" onClick={extraButton}>
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/varied-formats.svg" alt="Extras" />
                                <h2 className="feature-title">Varied formats</h2>
                                <p className="feature-text">Extra resources such as: Vlogs, Podcasts, Video tutorials and reading articles curated by tutors & students. 
                                <br /> Available from within "Extra" area.</p>
                            </div>
                        </button>

                        <button button className="features-element shadow small-scale" onClick={updatesButton}>
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/calendar-outline.svg" alt="Updates" />
                                <h2 className="feature-title">Frequent updates</h2>
                                <p className="feature-text">Get updates for new updates, content & features that are relevant to your supported modules. 
                                <br /> Available within "Updates" of the applications navigation-bar</p>
                            </div>
                        </button>

                        <button className="features-element shadow small-scale" onClick={notesButton}>
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/notes.svg" alt="Notes" />
                                <h2 className="feature-title">Notes</h2>
                                <p className="feature-text">Allowing you to create & manage quick notes.
                                    <br /> Available within "Notes" of the applications navigation-bar</p>
                            </div>
                        </button>

                        <button className="features-element shadow small-scale" onClick={profileButton}>
                            <div className="card-body">
                                <img className="card-img-top features-image" src="Image/progression-tracking.svg" alt="Profile" />
                                <h2 className="feature-title">Progression tracking</h2>
                                <p className="feature-text">Paticipate in games, analyse attempts & review your statistics. 
                                <br /> Available within "Dashboard" and "Profile" area.</p>
                            </div>
                        </button>
                    </ul>
                </section>

                <section className="contact-Section">                        
                        <h1 className="home-heading">Contact Us</h1>
                        {!successful ? 
                        <div> 
                            <form action="" className='contact-us-form'>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your Name here"
                                    value={contactUs.name} onChange={(e) => setContactUs({ ...contactUs, name: e.target.value })} />

                                <label htmlFor="Email">Email</label>
                                <input type="text" id="Email" name="Email" placeholder="Your Email here"
                                    value={contactUs.email} onChange={(e) => setContactUs({ ...contactUs, email: e.target.value })} />

                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" cols="30" rows="10" placeholder="Your Message here"
                                    value={contactUs.message} onChange={(e) => setContactUs({ ...contactUs, message: e.target.value })}></textarea>

                                <Button variant="outline-warning" className="shadow big-scale contact-us-button" onClick={postRequest}> Send </Button>
                            </form>
                        </div> 
                        : 
                        <div className='contact-us-form-sucess'>
                            <h3>Thankyou for your submission! <br/> We will be in contact soon.</h3>
                        </div>
                        }
                        <div className="shadow contact-details tiny-scale">
                            <iframe allowFullScreen="" loading="lazy" className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2369.1216446934704!2d-2.4374426839615553!3d53.573445565377064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ba7add9a0139b%3A0x26e04dfac5ed4688!2sUniversity%20of%20Bolton!5e0!3m2!1sen!2suk!4v1629653875219!5m2!1sen!2suk"></iframe>
                            <p>01204 903178</p>
                            <p>Y4-01 , Institute of Management <br /> University of Bolton, <br /> A676 Deane Rd,<br /> Bolton BL3 5AB</p>
                            <p>Designed, created & maintained by Thomas Storey <br/> ThomasJStoreyMail@gmail.com</p>
                        </div>
                </section>
            </div>
        );
    }
