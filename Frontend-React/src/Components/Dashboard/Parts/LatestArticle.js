import React from 'react'
import { Button, Modal } from 'react-bootstrap'
function LatestArticle() {
    return (
        <li>
            <div className="dashboard-element tiny-scale top-right-element">
                <h4 className="dashboard-element-heading">Latest Article</h4>
                {/* conditionally render contents incase no article */}
                <div className='article-preview-text'>

                    <small>There doesnt seem to be any articles for your currently</small>
                </div>
                <Button className='btn article-submit shadow' variant="info">Continue</Button>
            </div>
        </li>
    )
}

export default LatestArticle