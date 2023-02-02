import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'

function Badges({statisticsList}) {


    useEffect(() => {
        console.log(statisticsList)

    },[statisticsList])

  return (
    <Row className="profile-info-row-4 profile-info-row">
        <h2 className="profile-row-header profile-badges-header">Aggregate Badges</h2>
        <div className="profile-badges profile-row-content">
        {statisticsList?.map((statistics, index) => (
            <Col key={index} className="profile-badge profile-row-content-element shadow">
                
                
                <br/>
                <Button className="btn shadow" variant="outline-secondary">View</Button>
            </Col>
        ))}
        </div>
    </Row>
  )
}

export default Badges

// use this format instead of below V
// {badge.amount < 1 ? <div/>
// :
// badge.vgPercentage.... <div/>
//  }

 {/* <Row>
                            {badges.map((badge) => (
                                <Col key={badge.id}>
                                    <button className='badge' onClick={() => { setBadges(val => val.map(b => b.id === badge.id ? ({ ...b, show: !b.show }) : b)) }}>
                                        <div>
                                            {badge.show === false ?
                                                <div>
                                                    {badge.amount < 1 ? <img className="shadow emoj" src="/Image/Missing-stat.svg" alt=""></img> : <div></div>}
                                                    {badge.avgPercentage >= 0 && badge.avgPercentage <= 16 ? <img className="shadow emoj" src="/Image/0-16.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 17 && badge.avgPercentage <= 33 ? <img className="shadow emoj" src="/Image/17-33.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 34 && badge.avgPercentage <= 50 ? <img className="shadow emoj" src="/Image/34-50.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 51 && badge.avgPercentage <= 66 ? <img className="shadow emoj" src="/Image/51-66.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 67 && badge.avgPercentage <= 83 ? <img className="shadow emoj" src="/Image/67-83.svg" alt="" /> : <div></div>}
                                                    {badge.avgPercentage >= 84 && badge.avgPercentage <= 100 ? <img className="shadow emoj" src="/Image/84-100.svg" alt="" /> : <div></div>}

                                                </div>
                                                :
                                                <div className='badge-description'>

                                                    {badge.avgScore > 0 ?
                                                        <div>
                                                            <p className="badge-line"> {badge.task}</p>
                                                            <p className="badge-line"> Avg score: {(badge.avgPercentage).toFixed(1)}%</p>
                                                            <p className="badge-line"> Avg time: {(badge.avgTime).toFixed(0)}</p>
                                                            <p className="badge-line"> Games played: {badge.amount}</p>
                                                        </div>

                                                    : <div>
                                                        <br />Take part in <br />more {badge.task}<br /> to generate <br />analytics and <br /> track badge <br />progression
                                                    </div>}

                                                </div>}
                                        </div>
                                    </button>
                                </Col>
                            ))}

                        </Row> */}