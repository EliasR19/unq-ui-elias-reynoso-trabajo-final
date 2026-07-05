
const GameOver = ({puntaje, errorCount, palabrasUsadas, reiniciar}) => {

    return (
    <div>
        GameOver - 
        {puntaje} - 
        {errorCount}
        <div class="palabrasRepetidasList">

                                {palabrasUsadas.map((palabra, index) => (
                                    <div className='palabraSingular' key={`${palabra} + "_" + ${index}`}>                     
                                        <p>{palabra}</p>
                                     <p> →&nbsp;</p>
                                    </div>           
                                ))}
                            </div>
        <button onClick={reiniciar}>Reiniciar</button>
    </div>
)
}


export default GameOver;