import React, { useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import "./UITrails.css"

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="trailsText">
          <a.div style={{ height }}>{items[index] }</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function UITrail() {
  const [open, set] = useState(true)
  return (
    <div className="UITrail" onClick={() => set(state => !state)}>
      <Trail open={open}>
        {/* <img className="img shadow uitrail-image" src="/Image/baselogo.svg" alt="" height="300" width="300"/> */}
        <span>Ed Owl</span>
        <span>The HE digital learning</span>
        <span>companion app</span>
      </Trail>
    </div>
  )
}
