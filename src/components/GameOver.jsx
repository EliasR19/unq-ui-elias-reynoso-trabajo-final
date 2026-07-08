import LeaderBoard from './LeaderBoard';
import './GameOver.css'
import GrupoLetras from './GrupoLetras';
import { letrasAbecedarios } from '../services/utils';

const GameOver = ({puntaje, errorCount, palabrasUsadas, reiniciar}) => {

    const palabrasConLetra = (letra) => {
        const palabrasFiltradas = [];

        for(const p of palabrasUsadas){
            if(p.charAt(0) === letra){
                palabrasFiltradas.push(p);
            }
        }
        return palabrasFiltradas
    }



    return (
    <div className="gameOverContainer">

        <div className="mainContainerGameOver">

            <div className="headerContainer">
                <p className='gameOverText'>GameOver</p> 
                <div className="finalStatsContainer">
                    <p className="statsText">Points: {puntaje}</p>
                </div>
                <button className="botonSubmit" onClick={reiniciar}>Reiniciar</button>
            </div>
            <div className="line"></div>

            <div class="palabrasRepetidasList">
                {letrasAbecedarios.map((letra, index) => 
                    <GrupoLetras letra={letra} palabrasFiltradas={palabrasConLetra(letra)} index={index}/>
                )}
            </div>

        </div>


            <div className='navBarContainer'>
                <p className="navBarTitle">Palabras Encadendas</p>
                <LeaderBoard points={puntaje} errors={errorCount} hits={palabrasUsadas.length}/>
            </div>
    </div>
)
}


export default GameOver;