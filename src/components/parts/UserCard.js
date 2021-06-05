const UserCard = props => {
    const { user, index } = props
    let questionsNo = user.questions.length
    let answersNo = Object.keys(user.answers).length
    return <div className='user'>
        <span className='rank'>
            {index}
        </span>
        <div className='user-title'>
            <img alt={`${user.name} avatar`} src={user.avatarURL} />
            <h2>{user.name}</h2>
        </div>
        <div className='user-scores'>
            <span># Questions: <b>{questionsNo}</b></span> 
            <span># Answers: <b>{answersNo}</b></span> 
        </div>
        <div>
            <span className='score-label'>score</span>
            <span className='total-score'>
                {questionsNo + answersNo}
            </span>
        </div>
    </div>
}

export default UserCard