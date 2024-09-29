import React from 'react'

const FileDisplay = (props) => {

    const {handleAudioReset, file, audioStream} = props

  return (
    <main>
        <h1>Your<span> file</span></h1>
        <div className='file-detail'>
            <h3>Name</h3>
            <p>{file.name}</p>
        </div>
        <div className='file-btns'>
            <button className='reset-btn' onClick={handleAudioReset}>Reset</button>
            <button className='trans-btn'>Transcribe <i className="fa-solid fa-pen-nib"></i></button>
        </div>
    </main>
  )
}

export default FileDisplay