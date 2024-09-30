import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"

const HomePage = (props) => {

    const { setFile, setAudioStream } = props

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'

    const startRecording = async () => {
        let tempStream

        console.log('Start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (err) {
            console.log(err.message);
            return
        }

        setRecordingStatus('recording')

        //create new media recorder using the stream
        const media = new MediaRecorder(tempStream, { type: mimeType })

        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === 'undefined') { return }
            if (e.data.size === 0) { return }
            localAudioChunks.push(e.data)
        }
        setAudioChunks(localAudioChunks)
    }

    const stopRecording = async () => {
        setRecordingStatus('inactive')
        console.log('stop recording');

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([])
            setDuration(0)
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })


    return (
        <main>
            <h1>Trans<span>Lang</span></h1>
            <h3>Record <span>&rarr;</span> Transcribe <span>&rarr;</span> Translate</h3>
            <button className="record-btn" onClick={recordingStatus === 'recording' ? stopRecording : startRecording}>
                {recordingStatus === 'inactive' ? 'Record' : `Stop Recording`}
                <div className="timeline">
                    {duration !== 0 && (<p>{duration}s</p>)}
                    <i className={`fa-solid fa-microphone ${recordingStatus === 'recording' ? 'red' : ''} `}></i>
                </div>
            </button>
            <p>Or <label className="label-up">upload <input onChange={(e) => {
                const tempfile = e.target.files[0]
                setFile(tempfile)
            }} className="hidden" type="file" accept=".mp3, .wave" /></label>a mp3 file</p>
        </main>
    )
}

export default HomePage