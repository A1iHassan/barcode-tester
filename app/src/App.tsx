import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [barcodeValue, setBarcodeValue] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    // null deviceId defaults to the primary outward-facing camera
    const deviceId = undefined; // Use undefined for default camera

    // The reader needs to be bound to the video element.
    // It will automatically request the camera stream for you,
    // so we don't need the manual getUserMedia call anymore.
    codeReader.decodeFromVideoDevice(deviceId, videoRef.current, (result, error) => {
      if (result) {
        // Successful capture
        setBarcodeValue(result.getText())
        console.log('Barcode Format:', result.getBarcodeFormat());

        // Terminate active stream and decoding loop after a successful read
        codeReader.reset();
      }

      // Ignore typical Not Found errors during active scanning frames
      if (error && !(error instanceof NotFoundException)) {
        console.error('Processing error:', error);
      }
    })

    // Cleanup function when component unmounts
    return () => {
      codeReader.reset();
    }
  }, []) // Empty dependency array ensures this only runs once on mount

  return (
    <div className="page">
      hello
      <video ref={videoRef} autoPlay playsInline muted></video>
      {barcodeValue}
    </div>
  )
}

export default App
