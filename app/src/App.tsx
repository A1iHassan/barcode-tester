import { useEffect, useRef } from 'react'
import './App.css'

function App() {
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

  return (
    <div className="page">
      hello
      <video ref={videoRef} autoPlay playsInline muted></video>
    </div>
  )
}

export default App
