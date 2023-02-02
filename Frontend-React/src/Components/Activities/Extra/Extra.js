import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { baseGetRequest, putExtraViewRequest } from '../../../Functionality/Requests';
import { useStateValue } from '../../../Functionality/StateProvider';
import QRGenerator from '../../../Functionality/QRGenerator/QRGenerator';
import './Extra.css';

export default function Extra() {

    const [{ user }] = useStateValue();

    const params = useParams();
    const extraId = params?.id;

    const [extras, setExtras] = useState([]);
    const [originalExtras, setOriginalExtras] = useState([]);
    const [extra, setExtra] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");

    const [searchModules, setSearchModules] = useState([]);

    const [showExtraArticle, setShowExtraArticle] = useState(false);
    const [showModuleSelectModal, setShowModuleSelectModal] = useState(false);

    const handleCloseExtra = () => setShowExtraArticle(false);
    const handleCloseModuleSelect = () => setShowModuleSelectModal(false);


    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        var data = (await baseGetRequest("Extras/newestOrder-hideHidden"))
        console.log(extras)
        setExtras(data)
        setOriginalExtras(data)
    }

    useEffect(() => {
        if (extraId && originalExtras && extraId < originalExtras.length) {
            showArticle(originalExtras[extraId])
        }
    }, [extraId, originalExtras])

    const showArticle = (extra) => {
        setShowExtraArticle(true);
        setExtra(extra);
        postRequest(extra)
    }


    const postRequest = async (extra) => {
        try {
            putExtraViewRequest(`Extras/viewed/${extra.id}`)
            setExtras((extras) => extras.map((entity) => ({ ...entity, views: entity.views + (entity === extra), })));
        }
        catch (err) { console.log(err) }
    }

    const modifyExtrasByModule = (module) => {
        if (searchModules.filter((element) => module.code === element).length === 0) {
            setSearchModules((prev) => prev.concat(module.code))
        }
        else { setSearchModules((prev) => prev.filter((element) => module.code !== element)) }
    }

    useEffect(() => {
        updateResults(2)
    }, [searchModules])

    useEffect(() => {
        updateResults(2)
    }, [searchTitle])

    const updateResults = (type) => {
        if (type === 0) {
            setExtras(originalExtras)
            setSearchTitle("");
            setSearchModules([]);
        }
        else {
            if (searchModules.length > 0) { // if module selected
                if (searchTitle !== "") { // if module & title       
                    var temp = originalExtras.filter((eByModule) => searchModules.includes(eByModule.moduleCode))
                    setExtras(temp.filter((element) => element.title.toLowerCase().includes(searchTitle.toLowerCase())))
                }
                else { // if module but not title
                    setExtras(originalExtras.filter((eByModule) => searchModules.includes(eByModule.moduleCode)))
                }
            }
            else { // if title but not module
                if (searchTitle !== "") { setExtras(originalExtras.filter((element) => element.title.toLowerCase().includes(searchTitle.toLowerCase()))) }
                else { setExtras(originalExtras) } // if nothing
            }
        }
    }

    return (
        <div className='extra-container font'>
            <h1 className='extra-header'>Extras</h1>
            <div className="extra-search">
                <input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} name="search" placeholder="Refine by Title" className="extra-refine medium-scale shadow" />
                {user.modules ? <button className="extra-refine shadow medium-scale" onClick={(e) => { setShowModuleSelectModal(true) }}>Refine by modules</button> : <div> </div>}
                <button className="extra-refine shadow medium-scale" onClick={(e) => { updateResults(0) }}>Clear search</button>
            </div>
            <div>
                {extras.length > 0 ?
                    <div className="extras-list">
                        {extras.map(extra => (
                            <div className="text-center shadow articlediv medium-scale" key={extra.id} >
                                <div className="card-header" />
                                <div className="card-body">
                                    <h4 className="card-title"> {extra.title}  <small>- {extra.views} <img className="views-icon" src="/Image/Icons/Views.svg" alt="student icon" /> </small></h4>
                                    <small className="card-text">by: {extra.author}</small>
                                    <br />
                                    <small className="card-text">Module: {extra.moduleCode ? extra.moduleCode : "N/A"}</small>
                                    <br /> <br />
                                    <small className="card-text">{extra.summary}</small>
                                    <br />
                                    <Button variant="btn btn-warning shadow extra-button" onClick={() => showArticle(extra)}>Full Article</Button>
                                    <div className="card-footer text-muted"> {extra.generatedDate} </div>
                                </div>
                                <div className="card-header" />
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        <br /> <br /> <br />
                        <h4 className="extra-missing-content">
                            There seems to be no articles available at this time, be sure to revisit in future.
                            <br /><br />
                            However, If you keep seeing this message and believe it is a technical issue, make sure to contact your service provider.
                        </h4>
                    </div>
                }
            </div>

            <Modal className="font extra-modal" show={showExtraArticle} onHide={handleCloseExtra} centered backdrop="static">
                {extra &&
                    <>
                        <div className="card text-center shadow">
                            <div className="card-header"> </div>
                            <div className="card-body">
                                <h4> {extra.title}  <small>- {extra.views + 1} <img className="views-icon" src="/Image/Icons/Views.svg" alt="student icon" /> </small></h4>
                                <p className="extra-article-description">Module: {extra.moduleCode ? extra.moduleCode : "N/A"}</p>
                                <small className="extra-article-description">By {extra.author} </small> <br />
                                <small className="extra-article-description">Created on {extra.generatedDate}</small><br /><br />
                                <small className="extra-article-description"> {extra.summary}</small><br /><br />

                                {/* <img src={post.image} alt="post image" width="300"/> */}
                                {/* <cite><a href={post.image} target="_blank" rel="noopener noreferrer">image source</a></cite> */}

                                {extra.video ? <iframe className="video shadow" src={extra.video} title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> : <br />}
                                <div className="card-footer text-muted extra-content">
                                    <p className="extra-content-text">{extra.content}</p>
                                </div>
                                    <QRGenerator url={window.location.href}/>
                                    <Button variant="btn btn-dark" onClick={handleCloseExtra}>Close</Button>
                            </div>
                        </div>
                    </>}
            </Modal>

            <Modal className="font" show={showModuleSelectModal} onHide={handleCloseModuleSelect} centered backdrop="static">
                <div className="card text-center shadow">
                    <div className="card-header"> </div>
                    <div className="card-body">
                        <h4 className="card-title"> Module search filter</h4>
                        <p className="card-text extra-modal-sub-header">Select the modules you are subscribed for, to filter search results under.</p>
                        <div className="modules-register-list extra-modules">
                            {user.modules?.length > 0 ? <div>
                                {user.modules.map((module, index) => (
                                    <li key={index} className="modules-register-entry small-scale shadow">
                                        <div className="modules-entry-text">
                                            <p className="module-entry-name">{module.code}</p>
                                            <small>{module?.name}</small>
                                        </div>
                                        {searchModules.filter((element) => module.code === element).length > 0 ?
                                            <Button className='shadow btn-warning module-entry-add shadow tiny-scale' onClick={(e) => modifyExtrasByModule(module)}>
                                                <img className="icons" src="/Image/Icons/Check.svg" alt="checkmark" />
                                            </Button>
                                            :
                                            <Button className='shadow btn-warning module-entry-add shadow tiny-scale' onClick={(e) => modifyExtrasByModule(module)}>
                                                <img className="icons" src="/Image/Icons/Cross.svg" alt="cross" />
                                            </Button>
                                        }
                                    </li>
                                ))}
                            </div> : <div> No modules found </div>}
                        </div>
                        <Button variant="btn btn-dark" onClick={handleCloseModuleSelect}>Close</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}


