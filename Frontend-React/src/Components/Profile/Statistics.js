
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Carousel from 're-carousel';
import IndicatorDots from './IndicatorDots'

function Statistics({statisticsList}) {

    useEffect(() => {
        console.log(statisticsList)
        
    },[statisticsList])

  return (
    <Row className="profile-info-row-5 profile-info-row">
        <h2 className="profile-row-header profile-statistics-header">Aggregate Statistics</h2>
        <div className="profile-statistics profile-row-content">
        {statisticsList?.map((statistics, index) => (
            <Col key={index} className="profile-statistic profile-row-content-element shadow">
                
                
                <br/>
                <Button className="btn shadow" variant="outline-secondary">View</Button>
            </Col>
        ))}
        </div>
    </Row>
  )
}

export default Statistics

//             <div className='statistics-carousel'>
//                 <Carousel loop auto widgets={[IndicatorDots]}>
//                     <div className='stats-element badge'>
//                         {parentToChild.trending === 1 ? <img className="shadow emoj summary" src="/Image/trending-up.svg" alt="" /> : <div></div>}
//                         {parentToChild.trending === 0 ? <img className="shadow emoj summary" src="/Image/trending-down.svg" alt="" /> : <div></div>}
//                         <h3>{parentToChild.trending === 1 ? <p>Positively</p> : <p>Negatively</p>} trending</h3>
//                     </div>
//                     <div className='stats-element badge'>
//                         <img className="shadow emoj summary" src="/Image/Total-completed.svg" alt=""/>
//                         <h3>{parentToChild.totalTaskCompleted}<br/> Tasks completed</h3>
//                     </div>
//                     <div className='stats-element badge'>
//                     <img className="shadow emoj summary" src="/Image/Avg-correct.svg" alt=""/>
//                         <h3>{(parentToChild.avgTaskScore).toFixed(0)}%<br/> Avg score</h3>
//                     </div>
//                     <div className='stats-element badge'>
//                         <img className="shadow emoj summary" src="/Image/time-outline.svg" alt=""/>
//                         <h3>{(parentToChild.avgTaskTime).toFixed(0)}s<br/> Avg task time</h3>
//                     </div>
//               </Carousel>
//             </div>
