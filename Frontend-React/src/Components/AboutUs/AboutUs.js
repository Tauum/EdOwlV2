import React from 'react'
import "./AboutUs.css"
import FAQ from './FAQ'
import PoweredBy from './PoweredBy'


function AboutUs() {
  return (
    <div className="about-us font">
        <h1>About Us</h1>
        <p>We provide some information below which may answer some of your questions</p>
        <FAQ/>     
        <PoweredBy/>    
    </div>
  )
}

export default AboutUs