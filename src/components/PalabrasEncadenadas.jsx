import './PalabrasEncadenadas.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Timer from './timer';
import LeaderBoard from './LeaderBoard';


function PalabrasEncadenadas() {
    const [count, setCount] = useState(0)
    const [isGood, setIsGood] = useState(null);
    const [palabraI, setPalabraI] = useState("")
    const [letraRequerida, setLetraRequerida] = useState('')
    const [punteja, setPuntaje] = useState(0)

    const [palabrasUsadas, setPalabrasUsadas] = useState([])
    const palabrasCon = palabrasUsadas.filter(p => p.charAt(0) === letraRequerida);

    const [jugando, setJugando] = useState(false)


    //### VALIDADOR DE PALABRA
    useEffect(() => {
        if(palabraI.trim() !== ""){
        setIsGood(null) 
        }
    }, [palabraI])


    const validarPalabra = async (e) => {
        e.preventDefault();

        const palabraLimpia = palabraI.toLowerCase();
        const url = `https://word-api-hmlg.vercel.app/api/validate?word=${palabraLimpia}`
        
        try {
            if(jugando){
                if(palabrasUsadas.includes(palabraLimpia)){
                    setPalabraI("")  
                    alert(`¡La palabra "${palabraI}" ya fue usada! Elige otra.`);
                    return;
                }
                if(palabraLimpia.charAt(0) != letraRequerida){
                    setPalabraI("")  
                    alert(`¡La palabra "${palabraI}" no empieza con la letra '${letraRequerida.toUpperCase()}'.`);
                    return;
                }
            }
            
            const validador = await axios.get(url)

            if(validador.data.exists){
                setIsRunning(true)
                setJugando(true)
                palabrasUsadas.push(palabraLimpia)
                setLetraRequerida(palabraLimpia.charAt(palabraI.length-1))
                setPuntaje(punteja+palabraLimpia.length)
                setTiempo((tiempoAcutal) => 15)
            } else {
                setPalabraI("")  
                alert(`¡La palabra "${palabraI}" no existe`);
                return;
            }

            setIsGood(validador.data.exists)
            setPalabraI("")            

            return;
                
        } catch(error){
            console.log(error)
        }
    }


    // ### TIMER
    const [tiempo, setTiempo] = useState(15);
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if(tiempo <= 0){
            setIsRunning(false);
            setJugando(false);
            return;
        }
        let interval = null;
        if(isRunning){  
            interval = setTimeout(() => setTiempo((tiempoAcutal) => tiempoAcutal-1), 1000);
        }
        return () => clearInterval(interval)
    }, [tiempo,isRunning])


    
  return (
    <div class="mainContainer">
        <div className='navBarContainer'>
            <p>Palabras Encadendas</p>
            <LeaderBoard playerName="ER1" points={punteja}/>
        </div>

        <div class="gameContainer">
            <p class="puntajeNum">{punteja}</p>
            <div class="titleTextContainer">
                <p class="titleText textSize">Palabra con {letraRequerida.toUpperCase()}</p>
            </div>

            <div>
                <form onSubmit={validarPalabra} class="gameMain">
                    
                    <input 
                        type="text"
                        value={palabraI}
                        onChange={(e) => setPalabraI(e.target.value)}
                        placeholder='...'
                        maxLength={20}
                        class="inputPalabra"
                        />
                        <button type="submit">Enviar</button>
                </form>
                <Timer tiempo={tiempo} />
            </div>  
                <p>Es valida? {isGood == null ? "Ingrese Palabra": isGood ? "True" : "False"} </p>
        </div>

        <div class="palabrasRepetidasContainer">
            <p>Palabras usadas con <strong>{letraRequerida.toUpperCase()}</strong></p>
            <div>
            {palabrasCon.map((palabra, index) => (
                <ul class="palabrasRepetidasList">
                    <li key={index}>
                    <strong>{palabra}</strong>
                    </li>
                </ul>
            ))}
            </div>
        </div>

    </div>
  )
}

export default PalabrasEncadenadas
