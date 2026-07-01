import './LeaderBoard.css'

const LeaderBoard = ({playerName, points}) =>{

    const top10 = []
    top10.push({playerName, points})

    return (
        <div class="leaderBaordContainer">
            <p>Mejores Puntajes</p>
            <p>{top10[0].playerName}, {top10[0].points}</p>                   
        </div>
    )

}

export default LeaderBoard;