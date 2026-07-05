import './PalabrasEncadenadas.css'
import { useEffect, useState } from 'react';
import Timer from './timer';
import { verificarPalabra } from '../services/api';
import { normlizarPalabra, listaEjemplo } from '../services/utils';
import './Timer.css'
import GameOver from './GameOver';

function PalabrasEncadenadas() {
    const [pantallaActual, setPantallaActual] = useState('juegof');
    const [isValidWord, setIsValidWord] = useState(null);
    const [palabraI, setPalabraI] = useState("")
    const [letraRequerida, setLetraRequerida] = useState('')
    const [punteja, setPuntaje] = useState(0)
    
    const [palabrasUsadas, setPalabrasUsadas] = useState(listaEjemplo)
    
    const [errorCount, setErrorCount] = useState(0);
    const [error, setError] = useState("")
    
    
    const [tiempo, setTiempo] = useState(15);
    const [isRunning, setIsRunning] = useState(false)

    //### VALIDADOR DE PALABRA
    async function validador(palabraLimpia){
        try{
            return await verificarPalabra(palabraLimpia);
        }catch(error) {
             console.log(error) // hacer alerta
        }
    }
  
    const validarPalabra = async (e) => {
        e.preventDefault();
        setError("")
        //console.log("letraRequerida+palabraI: ", letraRequerida+palabraI);
        
        const palabraLimpia = normlizarPalabra(letraRequerida+palabraI);
        console.log("palabraLimpia: ", palabraLimpia)
        if(palabraLimpia.trim() === "") return;
        
        const isValid =  await validador(palabraLimpia);
        setIsValidWord(isValid.data.exists);



        //Validadores
        if(isRunning){
            //Se puede mover a un archivo de validadores
            if(palabrasUsadas.includes(palabraLimpia)){
                //alert(`¡La palabra "${palabraLimpia}" ya fue usada! Elige otra.`);
                setError(`¡La palabra "${palabraLimpia}" ya fue usada! Elige otra.`)
                accionesSiPalabraInvalida();
                return;
            }
            if(palabraLimpia.charAt(0) != letraRequerida){
                //alert(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`);
                setError(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`)
                accionesSiPalabraInvalida();
                return;
            }
            if(palabraI.trim() === ""){
                //alert(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`);
                setError('Ingrese una palabra')
                accionesSiPalabraInvalida();
                return;
            }
        } 

        //Valida que la palabra exista con la API
        if(isValid.data.exists){
            //console.log("palabra valida");
            accionesSiEsPalabraValida(palabraLimpia);

            if(isRunning) {
                setLetraRequerida(palabraLimpia.charAt(palabraI.length));
            } else {
                setIsRunning(true);
                setLetraRequerida(palabraLimpia.charAt(normlizarPalabra(palabraI).length-1))
            }

         } else {
            setPalabraI("")  
            setErrorCount(prev => prev + 1)
            //alert(`¡La palabra "${palabraI}" no existe`);
            setError(`¡La palabra "${palabraLimpia}" no existe`)
            return;
        }


        setPalabraI("")            
        return;

    }

    const accionesSiEsPalabraValida = (palabraLimpia) => {
            setPalabrasUsadas([...palabrasUsadas, palabraLimpia])
            setPuntaje(punteja+palabraLimpia.length)
            setTiempo(() => 15)
    }

    const accionesSiPalabraInvalida = () => {
            setPalabraI("")  
            setIsValidWord(false)
            setErrorCount(prev => prev + 1)
    }

    
   // console.log(palabrasUsadas + " | " + letraRequerida )
    
    // ### TIMER
    //Se puede mover a un componente header
    useEffect(() => {
        if(tiempo <= -1){
            setIsRunning(false);
            setPantallaActual('gameOver')
            return;
        }
        let interval = null;
        if(isRunning){  
            interval = setTimeout(() => setTiempo((tiempoAcutal) => tiempoAcutal-1), 1000);
        }
        return () => clearInterval(interval)
    }, [tiempo,isRunning])

    const restante = (tiempo / 15) * 100;
    const colorAlerta = (() => {
      if(tiempo <= 5 && tiempo >= 0)return 'red'
      if(tiempo <= 10 && tiempo > 5)return 'yellow'
      return 'green'
    })

    const reiniciarJuego = () => {
        setPantallaActual('juego');
        setIsValidWord(null);
        setPalabraI("");
        setLetraRequerida('');
        setPuntaje(0);
        setPalabrasUsadas([]);
        setErrorCount(0);
        setError("")
        setTiempo(15);
        setIsRunning(false)
    }

    
  return (
    <div className={`pageContainer`}>

        {pantallaActual === 'juego' ? (

        <>
            <div key={errorCount} className={`fondoError ${errorCount > 0 ? 'error' : ''}`} />

            <div className="mainContainer">

                <div className="gameHeader">
                    <div className="timerHeader">Points: <p className="puntajeNum">{punteja}</p></div>
                    <div className="timerHeader">Time: <Timer tiempo={tiempo} /></div>
                </div>

                <div className="timerBarProgressContainer">
                    <div className={`timerBarProgress`} 
                        style={{width: `${restante}%`,
                                backgroundColor: colorAlerta()}}>
                    </div>   
                </div>



                <div class="gameContainer">

                    <div class="titleTextContainer">
                        <p class="titleText textSize">{palabrasUsadas.length == 0 ? "Escribe una palabra" : `Palabra con ${letraRequerida.toUpperCase()}` }</p>
                    </div>

                <div>
                    <form onSubmit={validarPalabra} class="gameMain">
                        {letraRequerida.toUpperCase()}
                        <input 
                            type="text"
                            value={palabraI}
                            onChange={(e) => setPalabraI(e.target.value)}
                            placeholder='...'
                            maxLength={20}
                            class="inputPalabra"
                            />
                            <button className="gameBoton" type="submit">Enviar</button>
                    </form>
                    <div className='inputLine'></div>
                    {error == "" ? (
                        <p>Es valida? {isValidWord == null ? "Ingrese Palabra": isValidWord ? "True" : "False"} </p>
                    ) : (
                        <p>Error: {error}</p>
                        )
                    }
                
                </div>  

                    <div class="palabrasRepetidasContainer">

                        {palabrasUsadas.length > 0 ? (
                            <p>Palabras usadas con <strong>{letraRequerida.toUpperCase()}</strong></p>
                        ) : (
                            <p>Todavia no se ha empezado el juego</p>
                            )
                        }                        

                            <div class="palabrasRepetidasList">

                                {palabrasUsadas.map((palabra, index) => (
                                    <div className='palabraSingular' key={`${palabra} + "_" + ${index}`}>
                                    {palabra.charAt(0) === letraRequerida ? (
                                        <p className='palabraMarcada'>{palabra}</p>
                                    ) : (
                                        <p>{palabra}</p>
                                    )}
                                     <p> →&nbsp;</p>
                                    </div>           
                                ))}
                            </div>

                    </div>
                </div>
            </div>  
        </>       
        ) : (
            <GameOver puntaje={punteja} errorCount={errorCount} palabrasUsadas={palabrasUsadas} reiniciar={reiniciarJuego}/>
        )}                  
    </div>
  )
}

export default PalabrasEncadenadas
