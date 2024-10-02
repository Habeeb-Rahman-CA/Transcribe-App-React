import { useState } from "react"
import Transcription from "./Transcription"
import Translation from "./Translation"

const Information = (props) => {

    const { output } = props
    const [tab, setTab] = useState('transcription')

    return (
        <main>
            <h1>Your<span> Transcription</span></h1>
            <div className="btns">
                <button onClick={() => setTab('transcription')} className="scribe-btn" style={tab === 'transcription' ? { backgroundColor: '#2569c2', color: '#fff' } : { backgroundColor: '#fff' }}>Transcription</button>
                <button onClick={() => setTab('translation')} className="trnsltn-btn" style={tab === 'translation' ? { backgroundColor: '#2569c2', color: '#fff' } : { backgroundColor: '#fff' }}>Translation</button>
            </div>
            {tab === 'transcription' ? (
                <Transcription {...props} />
            ) : (
                <Translation {...props} />
            )}
        </main>
    )
}

export default Information