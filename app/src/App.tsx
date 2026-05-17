import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [barcodeValue, setBarcodeValue] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { exact: "environment" }
          }
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    startStream()
  }, [])

  const codeReader = new BrowserMultiFormatReader();

  const videoElementId = 'video-stream';

  // null deviceId defaults to the primary outward-facing camera
  const deviceId = null;

  codeReader.decodeFromVideoDevice(deviceId, videoElementId, (result, error) => {
    if (result) {
      // Successful capture
      setBarcodeValue(result.getText())
      console.log('Barcode Format:', result.getBarcodeFormat());

      // Terminate active stream and decoding loop
      codeReader.reset();
    }

    // Ignore typical Not Found errors during active scanning frames
    if (error && !(error instanceof NotFoundException)) {
      console.error('Processing error:', error);
    }
  })

  return (
    <div className="page">
      hello
      <video ref={videoRef} autoPlay playsInline muted></video>
      {barcodeValue}
    </div>
  )
}

export default App
