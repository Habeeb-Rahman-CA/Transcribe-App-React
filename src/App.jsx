import { useEffect, useRef, useState } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay"
import Information from "./components/Information"
import Transcribing from "./components/Transcribing"
import { MessageTypes } from "./utlis/presets"

function App() {

  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [downlaoding, setDownloading] = useState(false)

  const isAudioAvailable = file || audioStream

  const handleAudioReset = () => {
    setFile(null)
    setAudioStream(null)
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utlis/whisper.worker.js', import.meta.url), {
        type: "module"
      })
    }
    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('downloading');
          break;
        case 'LOADING':
          setLoading(true)
          console.log('loading');
          break;
        case 'RESULT':
          setOutput(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log('done');
          break;

      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  }, [])

  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({ sampleRate: sampling_rate })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper.tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  return (
    <div className="app">
      <section>
        <Header />
        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />
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