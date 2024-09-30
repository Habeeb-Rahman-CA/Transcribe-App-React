import { useEffect, useState } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay"

function App() {

  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)

  const isAudioAvailable = file || audioStream

const handleAudioReset = () =>{
  setFile(null)
  setAudioStream(null)
}

useEffect(() =>{
  console.log(audioStream);
}, [audioStream])

  return (
    <div className="app">
      <section>
        <Header />
        {isAudioAvailable ? (<FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />) : (<HomePage setFile={setFile} setAudioStream={setAudioStream} />)}
      </section>
      <footer>

      </footer>
    </div>
  )
}

export default App
