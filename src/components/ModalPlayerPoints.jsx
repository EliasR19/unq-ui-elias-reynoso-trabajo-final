import './ModalPlayerPoints.css'
import { useState } from 'react';
const ModalPlayerPoints = ({points, errors, registrar}) => {

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
        <div class="modalContainer">
            <div class="arcadeModal">
                <h2 class="modalTitle">¡NUEVO RÉCORD!</h2>
                <p class="modalLabel">INGRESA TUS INICIALES</p>
                
                <form onSubmit={validadorPlayer}>
                    <input 
                        type="text" 
                        class="modalInput" 
                        maxlength="10" 
                        value={player.toUpperCase()}
                        onChange={(e) => setPlayer(e.target.value)}
                        placeholder="JUGADOR_1" 
                        required 
                        autocomplete="off"
                    />
                    {isInvalidNameError && <p className="modalLabel">El nombre debe tener 3 caracteres</p>}
                    <p className="modalLabel">Points:{points}-Fails:{errors}</p>
                    <button type="submit" class="modalButton">REGISTRAR</button>
                </form>
            </div>
        </div>
    )
}

export default ModalPlayerPoints;