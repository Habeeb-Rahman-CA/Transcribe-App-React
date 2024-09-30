
const Transcribing = (props) => {

    const { downloading } = props

    return (
        <div className="transcribing">
            <div className="scribe-head">
                <h1>Transcribing</h1>
                <p>{!downloading ? 'warming up cylinder' : 'core cylinder engaged'}</p>
            </div>
            <div className="loader">
                {[0, 1, 2].map(val => {
                    return (
                        <div key={val} className={`loading loading${val}`}></div>
                    )
                })}
            </div>
        </div>

    )
}

export default Transcribing