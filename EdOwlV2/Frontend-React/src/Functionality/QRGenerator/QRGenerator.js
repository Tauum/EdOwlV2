import React, {useState } from 'react'
import { Button } from 'react-bootstrap'
import QRCode from 'qrcode'
import "./QRGenerator.css"


function QRGenerator({url}) {

    const [qrCode, setQRCode] = useState()
    const [clicked, setClicked] = useState(false)

    const generateClicked = () => {

        QRCode.toDataURL(url, (err, url) => {
            if (err) return console.log(err)
            console.log(url)
            setQRCode(url)
            setClicked(!clicked)
        })
    }

  return (
    <div>
        <Button onClick={generateClicked} className="btn shadow qr-code-button" variant="warning">{clicked ? "hide" : "QR Code" }</Button>
        {qrCode && clicked &&
        <> 
        
            <Button href={qrCode} download="qrCode.png" className="btn shadow qr-code-button" variant="warning">Download</Button>
            <br/>
            <div className="qr-code-image-container small-scale shadow">
            <img src={qrCode} href={qrCode} alt="QR code" className="qr-code-image shadow small-scale"  />
            </div>
        </>
        }
    </div>
  )
}

export default QRGenerator