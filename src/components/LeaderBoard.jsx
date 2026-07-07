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
        
        <div class="leaderBoardContainer">
            {(hayNuevoTop && mostrarModal) && (
                <ModalPlayerPoints points={points} errors={errors} registrar={actualizar}/>
            )}
        <p className="leaderBoardTitle">TOP</p>



        <div className="labelStatsListContainer">
            <div className="tableRow headerList">
                <div className="colRank">RANK</div>
                <div className="test1-header">
                    <div className="colPlayer">PLAYER</div>
                    <div className="colScore">SCORE</div>
                </div>

            </div>
            
            {topPuntajes.map((player, index) => (
                <div className="playerList">

                    <div className={`tableRow ${index == 0 ? 'top1Color' : index == 1 || index == 2 ? 'top23Color' : 'topRestoColor'}`} key={index}>
                        <div className="colRank">{numeracion[index]}</div>
                    
                        <div className='test1'>
                            <div className='test2'>
                                <div className="colPlayer">{player.playerName}</div>           
                                <div className="colScore">{player.points}</div>
                            </div>
                            <div className="statsRow">
                                <div className="colStats">
                                    <span>words:{player.errors}</span>                   
                                    <span>errors:{player.errors}</span>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
             ))}

        </div>            
        </div>
    )

}

export default LeaderBoard;