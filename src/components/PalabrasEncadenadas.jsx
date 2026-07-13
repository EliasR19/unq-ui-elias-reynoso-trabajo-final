import './PalabrasEncadenadas.css'
import { useEffect, useState } from 'react';
import Timer from './timer';
import { verificarPalabra } from '../services/api';
import { normlizarPalabra } from '../services/utils';
import './Timer.css'
import GameOver from './GameOver';

function PalabrasEncadenadas() {
    const [pantallaActual, setPantallaActual] = useState('juego');
    const [isValidWord, setIsValidWord] = useState(null);
    const [palabraI, setPalabraI] = useState("")
    const [letraRequerida, setLetraRequerida] = useState('')
    const [punteja, setPuntaje] = useState(0)
    
    const [palabrasUsadas, setPalabrasUsadas] = useState([])
    
    const [errorCount, setErrorCount] = useState(0);
    const [error, setError] = useState("")
    
    
    const [tiempo, setTiempo] = useState(15);
    const [isRunning, setIsRunning] = useState(false)

    const [cargando, setCargando] = useState(false);

    //### VALIDADOR DE PALABRA
    async function validador(palabraLimpia){
        try{
            return await verificarPalabra(palabraLimpia);
        }catch(error) {
             return alert("Ocurrio un error.");
        }
    }
    
    const intentaDeNuevo = "Intenta de nuevo!"
    const validarPalabra = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("")
        if(cargando) return;

        
        const palabraLimpia = normlizarPalabra(letraRequerida+palabraI);  

        //Validadores
        if(palabraLimpia.trim() == "" || palabraLimpia.trim().length == 0){
            setError('Ingrese una palabra')
            setCargando(false)  
            return;
        }
        if(isRunning){
            if(palabrasUsadas.includes(palabraLimpia)){
                setError(`¡La palabra "${palabraLimpia}" ya fue usada! ${intentaDeNuevo}`)
                accionesSiPalabraInvalida();
                return;
            }
            if(palabraLimpia.charAt(0) != letraRequerida){
                //No deberia haber un caso donde se llegue aca.
                setError(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'. ${intentaDeNuevo}`)
                accionesSiPalabraInvalida();
                return;
            }
        } 

        const isValid =  await validador(palabraLimpia);
        setIsValidWord(isValid.data.exists);


        //Valida que la palabra exista con la API
        if(isValid.data.exists){
            accionesSiEsPalabraValida(palabraLimpia);

            if(isRunning) {
                setLetraRequerida(palabraLimpia.charAt(palabraI.length));
            } else {
                setIsRunning(true);
                setLetraRequerida(palabraLimpia.charAt(normlizarPalabra(palabraI).length-1))
            }

         } else {
                setError(`¡La palabra "${palabraLimpia}" no existe. ${intentaDeNuevo}`)
                accionesSiPalabraInvalida(palabraLimpia)
                return;
        }
        setPalabraI("")     
        return;

    }

    const accionesSiEsPalabraValida = (palabraLimpia) => {
        if(!cargando){
            setPalabrasUsadas([...palabrasUsadas, palabraLimpia])
            setPuntaje(punteja+palabraLimpia.length)
            setTiempo(() => 15)
            setCargando(false)  
        }
    }

    const accionesSiPalabraInvalida = () => {
        if(!cargando){
            setPalabraI("")  
            setIsValidWord(false)
            setErrorCount(prev => prev + 1)
            setCargando(false)  
        }
    }
    
    // ### TIMER
    useEffect(() => {
        let interval = null;
        if(isRunning){  
            interval = setTimeout(() => setTiempo((tiempoAcutal) => {
                                if(tiempo <= 0){
                                    setIsRunning(false)
                                    setPantallaActual('gameOver')
                                    return 0;
                                }        
                                return tiempoAcutal-1;
                            }
                ), 1000);
        }

        return () => clearTimeout(interval)
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

    const textoValidador = () => {
        if(cargando){
            return <p>Validando...</p>
        }
        if(error == ""){
            return <p className={isValidWord ? "validColor" : ""}>{isValidWord == null ? "Ingrese Palabra": isValidWord ? "Valida" : "Invalida"}</p>
        }  else {
            return <p className="errorColor">Error: {error}.</p>
        }
    }


  return (
    <div className={`pageContainer`}>       

        {pantallaActual === 'juego' ? (

        <>
            <div key={errorCount} className={`fondoError ${errorCount > 0 ? 'error' : ''}`} />

            <div className="mainContainer">

                <div className='gameTitleContainer'>
                        <img src='/chain-2.png' className='chainImg flip hideMedia'/>
                        <p className='titleGame'>PALABRAS</p>
                        <img src='/chain-mid-2.png' className='chainImg  hideMedia'/>
                        <p className='titleGame'>ENCADENADAS</p>
                        <img src='/chain-2.png' className='chainImg hideMedia'/>
                    </div>

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



                <div className="gameContainer">

                    

                    <div className="titleTextContainer">
                        <p className="titleText textSize">{palabrasUsadas.length == 0 ? "Escribe una palabra" : `Palabra con ${letraRequerida.toUpperCase()}` }</p>
                    </div>

                
                    <form onSubmit={validarPalabra} className="gameMain">
                        <div className="gameMainInputContainer">
                            <div className="gameMainInput">
                                <p>{letraRequerida.toUpperCase()}</p>
                                <input 
                                    type="text"
                                    value={palabraI}
                                    onChange={(e) => setPalabraI(e.target.value)}
                                    placeholder='...'
                                    maxLength={20}
                                    className="inputPalabra"
                                    />
                            </div>
                            <div className='inputLine'></div>
                        </div>
                            <button className="botonSubmit" type="submit">Validar</button>
                    </form>
                    <div className="errorInputText">

                        {textoValidador()}
        
                </div>
                 
                    <div className="lineGame"></div>

                    <div className="palabrasRepetidasContainer">
                        <div className="palabrasRepetidarTitle">
                        {palabrasUsadas.length > 0 ? (
                            <p>Palabras usadas</p>
                        ) : (
                            <p>Todavia no se ha empezado el juego</p>
                            )
                        }                        
                        </div>
                            <div className="palabrasRepetidasList">

                                {palabrasUsadas.map((palabra, index) => (
                                    <div className='palabraSingular' key={`${palabra} + "_" + ${index}`}>
                                    {palabra.charAt(0) === letraRequerida ? (
                                        <p className='palabraMarcada'>{palabra}</p>
                                    ) : (
                                        <p>{palabra}</p>
                                    )}
                                    <p className="palabraRepetidasFlecha">&nbsp;→&nbsp;</p>
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
