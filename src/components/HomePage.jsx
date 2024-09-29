
const HomePage = (props) => {

    const { setFile, setAudioStream } = props

    return (
        <main>
            <h1>Trans<span>Lang</span></h1>
            <h3>Record <span>&rarr;</span> Transcribe <span>&rarr;</span> Translate</h3>
            <button className="record-btn">
                Record
                <i className="fa-solid fa-microphone"></i>
            </button>
            <p>Or <label className="label-up">upload <input onChange={(e) => {
                const tempfile = e.target.files[0]
                setFile(tempfile)
                }} className="hidden" type="file" accept=".mp3, .wave" /></label>a mp3 file</p>
        </main>
    )
}

export default HomePage