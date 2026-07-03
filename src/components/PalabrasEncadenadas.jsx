import './PalabrasEncadenadas.css'
import { useEffect, useState } from 'react';
import Timer from './timer';
import LeaderBoard from './LeaderBoard';
import { verificarPalabra, listaEjemplo } from '../services/api';
import './Timer.css'

function PalabrasEncadenadas() {
    const [isValidWord, setIsValidWord] = useState(null);
    const [palabraI, setPalabraI] = useState("")
    const [letraRequerida, setLetraRequerida] = useState('')
    const [punteja, setPuntaje] = useState(0)
    
    const [palabrasUsadas, setPalabrasUsadas] = useState(listaEjemplo)
    
    const [errorCount, setErrorCount] = useState(0);
    const [error, setError] = useState("")
    const palabrasCon = palabrasUsadas.filter(p => p.charAt(0) === letraRequerida);
    
    
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

    const normlizarPalabra = (palabra) => {return palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();};
    


    const validarPalabra = async (e) => {
        e.preventDefault();
        setError("")
        console.log("letraRequerida+palabraI: ", letraRequerida+palabraI);
        
        const palabraLimpia = normlizarPalabra(letraRequerida+palabraI);
        console.log("palabraLimpia: ", palabraLimpia)
        if(palabraLimpia.trim() === "") return;
        
        const isValid =  await validador(palabraLimpia);
        setIsValidWord(isValid.data.exists);

            if(isRunning){
                if(palabrasUsadas.includes(palabraLimpia)){
                    setPalabraI("")  
                    //alert(`¡La palabra "${palabraLimpia}" ya fue usada! Elige otra.`);
                    setError(`¡La palabra "${palabraLimpia}" ya fue usada! Elige otra.`)
                    setIsValidWord(false)
                    setErrorCount(prev => prev + 1)
                    return;
                }
                if(palabraLimpia.charAt(0) != letraRequerida){
                    setPalabraI("")  
                    //alert(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`);
                    setError(`¡La palabra "${palabraLimpia}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`)
                    setIsValidWord(false)
                    setErrorCount(prev => prev + 1)
                    return;
                }
            } else {
                //Validar la palabra
                setIsRunning(true)
                setPalabrasUsadas([...palabrasUsadas, palabraLimpia])
                setLetraRequerida(palabraLimpia.charAt(normlizarPalabra(palabraI).length-1))
                setPuntaje(punteja+palabraLimpia.length)
                setTiempo(() => 15)

                setPalabraI("")   
                return;
            }
            
            //PENSAR FORMA PARA NO REPETIR CODIGO

            if(isValid.data.exists){
                console.log("palabra valida");
                
                setPalabrasUsadas([...palabrasUsadas, palabraLimpia])
                setLetraRequerida(palabraLimpia.charAt(palabraI.length))
                setPuntaje(punteja+palabraLimpia.length)
                setTiempo(() => 15)

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


    
   // console.log(palabrasUsadas + " | " + letraRequerida )
    
    // ### TIMER
    //Se puede mover a un componente header
    useEffect(() => {
        if(tiempo <= 0){
            setIsRunning(false);
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


    
  return (
    <div className={`pageContainer`}>

        <div key={errorCount} className={`fondoError ${errorCount > 0 ? 'error' : ''}`} />

        <div className='navBarContainer'>
            <p>Palabras Encadendas</p>
            <LeaderBoard playerName="ER1" points={punteja}/>
        </div>

    
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
                            <button className="botonSubmit" type="submit">Enviar</button>
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
    </div>
  )
}

export default PalabrasEncadenadas
