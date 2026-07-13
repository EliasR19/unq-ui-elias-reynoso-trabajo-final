import './ModalPlayerPoints.css'
import { useState } from 'react';
const ModalPlayerPoints = ({points, errors, hits, registrar}) => {

    const [player, setPlayer] = useState("");
    const [isInvalidNameError, setIsInvalidNameError] = useState(false);

    
    const validadorPlayer = (e) => {
        e.preventDefault();
        if(player.trim() !== "" && player.length == 3){
            registrar(player);
        } else {
            setIsInvalidNameError(true)
        }
    }

    return(
        <div className="modalContainer">
            <div className="arcadeModal">
                <h2 className="modalTitle">¡NUEVO RECORD!</h2>
                <p className="modalLabel labelCyan">INGRESA TUS INICIALES</p>
                
                <form onSubmit={validadorPlayer}>
                    <input 
                        type="text" 
                        className="modalInput" 
                        maxlength="3" 
                        value={player.toUpperCase()}
                        onChange={(e) => setPlayer(e.target.value)}
                        placeholder="PLAYER" 
                        required 
                        autocomplete="off"
                        autoFocus
                    />
                    {isInvalidNameError && <p className="modalLabel labelRed blink">El nombre debe tener 3 caracteres</p>}
                    <div className="modalStatsTable">
                        <div className="statsRow">
                            <span className="labelYellow">POINTS</span>
                            <span className="labelWhite">{points} PTS</span>
                        </div>
                        <div className="statsRow">
                            <span className="labelGreen">HITS</span>
                            <span className="labelWhite">{hits} HTS</span>
                        </div>
                        <div className="statsRow">
                            <span className="labelRed">FAILS</span>
                            <span className="labelWhite">{errors} ERR</span>
                        </div>
                    </div>
                    <button type="submit" className="modalButton">REGISTRAR</button>
                </form>
            </div>
        </div>
    )
}

export default ModalPlayerPoints;