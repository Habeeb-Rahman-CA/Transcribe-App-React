const FileDisplay = (props) => {

  const { handleAudioReset, file, audioStream, handleFormSubmission } = props

  return (
    <main>
      <h1>Your<span> file</span></h1>
      <div className='file-detail'>
        <h3>Name</h3>
        <p>{file ? file?.name : 'Custom Audio'}</p>
      </div>
      <div className='file-btns'>
        <button className='reset-btn' onClick={handleAudioReset}>Reset</button>
        <button onClick={handleFormSubmission} className='trans-btn'>Transcribe <i className="fa-solid fa-pen-nib"></i></button>
      </div>
    </main>
  )
}

export default FileDisplay