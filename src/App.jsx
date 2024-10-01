import { useEffect, useState } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay"
import Information from "./components/Information"
import Transcribing from "./components/Transcribing"

function App() {

  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(true)
  const [loading, setLoading] = useState(false)

  const isAudioAvailable = file || audioStream

  const handleAudioReset = () => {
    setFile(null)
    setAudioStream(null)
  }

  useEffect(() => {
    console.log(audioStream);
  }, [audioStream])

  return (
    <div className="app">
      <section>
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer>

      </footer>
    </div>
  )
}

export default App
