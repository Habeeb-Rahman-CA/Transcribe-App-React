import { useState } from "react"

const Information = () => {

const [tab, setTab] = useState('transcription')

    return (
        <main>
            <h1>Your<span> Transcription</span></h1>
            <div className="btns">
                <button onClick={() => setTab('transcription')} className="scribe-btn" style={tab === 'transcription' ? {backgroundColor: '#2569c2', color: '#fff'} : {backgroundColor: '#fff'}}>Transcription</button>
                <button onClick={() => setTab('translation')} className="trnsltn-btn" style={tab === 'translation' ? {backgroundColor: '#2569c2', color: '#fff'} : {backgroundColor: '#fff'}}>Translation</button>
            </div>
        </main>
    )
}

export default Information