import React from 'react'

function PoweredBy() {
  return (
    <div className="powered-by">
        <h2>Powered by</h2>
        <div className="powered-by-logos">
            <ul className="powered-by-list shadow tiny-scale">
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/Ubuntu.svg" alt="" />
                </li>
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/Mysql.svg" alt="" />
                </li>
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/Java.svg" alt="" />
                </li>
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/Spring.svg" alt="" />
                </li>
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/Node.svg" alt="" />
                </li>
                <li>
                  <img className="powered-by-logo medium-scale shadow" src="/Image/Other-Logos/React.svg" alt="" />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default PoweredBy