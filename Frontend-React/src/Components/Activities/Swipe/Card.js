import React from "react";
import { animated, interpolate } from "react-spring";

class Card extends React.Component {
  render() {
    const { i, x, y, rot, scale, trans, bind, cardData } = this.props;
    const { question, subText, imageURL,  } = cardData[i];

    return (
      <animated.div className="swipe-card-animated-parent" // animated div is more efficient apparently
        key={i} style={{  transform: interpolate( [x, y], (x, y) => `translate3d(${x}px,${y}px,0)` ) }} >

        <animated.div {...bind(i)} style={{ transform: interpolate([rot, scale], trans) }} 
        className="swipe-card-animated-child" >
            <div className="card">

                { imageURL? <img src={imageURL} alt="swipe-img" className="swipe-img" /> 
                : 
                <div></div>}

                <h2 className="swipe-question">{question}</h2>

                <h5 className="swipe-sub-text">{subText}</h5>

            </div>
        </animated.div>
      </animated.div>
    );
  }
}

export default Card;
