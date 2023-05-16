import React from 'react'
import HowCreated from './FAQ/HowCreated'
import HowFunded from './FAQ/HowFunded'
import WhatIs from './FAQ/WhatIs'
import WhatTechnologies from './FAQ/WhatTechnologies'
import Secure from './FAQ/Secure'
import HowToAdopt from './FAQ/HowToAdopt'
import TakingPart from './FAQ/TakingPart'
import HowEdOwl from './FAQ/HowEdOwl'
import EdOwlModel from './FAQ/EdOwlModel'
import WhySignedOut from './FAQ/WhySignedOut'

function FAQ() {
    return (
        <div className="faq">
            <h2>FAQ</h2>
            <WhySignedOut/>
            <WhatIs/>
            <TakingPart/>
            <HowFunded/>
            <HowEdOwl/>
            <EdOwlModel/>
            <Secure/>
            <HowCreated/>
            <WhatTechnologies/>
            <HowToAdopt/>
        </div>
    )
}

export default FAQ