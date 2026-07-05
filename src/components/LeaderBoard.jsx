import './LeaderBoard.css'
import ModalPlayerPoints from './ModalPlayerPoints';
import { obtenerTop, actualizarLeaderBoard } from '../services/storage';
import { useState } from 'react';
import { numeracion } from '../services/utils';

const LeaderBoard = ( {points, errors}) =>{

    const [mostrarModal, setMostrarModal] = useState(true);
    const [topPuntajes, setTopPuntajes] = useState(obtenerTop());
    const hayNuevoTop = topPuntajes.length < 10 || (topPuntajes[9] ? topPuntajes[9].points < points : true);
    


    const actualizar = (playerChr) => {
        actualizarLeaderBoard(playerChr.toUpperCase(), points, errors);
        setTopPuntajes(obtenerTop());
        setMostrarModal(false);
    }

    return (
        
        <div class="leaderBaordContainer">
            {(hayNuevoTop && mostrarModal) && (
                <ModalPlayerPoints points={points} errors={errors} registrar={actualizar}/>
            )}
        <p className="leaderBoardTitle">Mejores Puntajes</p>
        <div className="labelStatsListContainer">

              <div className="positionLabel">
                <p className="labelText">RANK</p>
                {topPuntajes.map((player, index) =>( 
                    <p>{numeracion[index]}</p>      
                ))}
            </div>
            
            <div className="rankLine"></div>    
                
            <div className="playerLabel">
                <p className="labelText">PLAYER</p>
                {topPuntajes.map((player) =>( 
                    
                    <p>{player.playerName}</p>               
                ))}
            </div>

            <div className="pointsLabel"> 
                <p className="labelText">SCORE</p>
                {topPuntajes.map((player) =>( 
                    <p>{player.points}</p>              
                ))}
            </div>

            <div className="errorsLabel">
                <p className="labelText">FAILS</p>
                {topPuntajes.map((player) =>( 
                    <p>{player.errors}</p>              
                ))}
            </div>
        </div>            
        </div>
    )

}

export default LeaderBoard;