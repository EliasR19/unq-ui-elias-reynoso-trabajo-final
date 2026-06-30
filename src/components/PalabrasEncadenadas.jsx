import './PalabrasEncadenadas.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Timer from './timer';

function PalabrasEncadenadas() {
    const [count, setCount] = useState(0)
    const [isGood, setIsGood] = useState(null);
    const [palabraI, setPalabraI] = useState("")
    const [letraRequerida, setLetraRequerida] = useState('A')
    const [punteja, setPuntaje] = useState(0)

    const [palabrasUsadas, setPalabrasUsadas] = useState([])
    const palabrasCon = palabrasUsadas.filter(p => p.charAt(0) === letraRequerida);



    //### VALIDADOR DE PALABRA
    useEffect(() => {
        if(palabraI.trim() !== ""){
        setIsGood(null) 
        }
    }, [palabraI])


    const validarPalabra = async (e) => {
        e.preventDefault();

        setIsRunning(true)
        const palabraLimpia = letraRequerida+palabraI.toLowerCase();
        const url = `https://word-api-hmlg.vercel.app/api/validate?word=${palabraLimpia}`
        try {
            if(palabrasUsadas.includes(palabraLimpia)){
            setPalabraI("")  
            alert(`¡La palabra "${letraRequerida}${palabraI}" ya fue usada! Elige otra.`);
            return;
            }
            const validador = await axios.get(url)


            if(validador.data.exists){
                palabrasUsadas.push(palabraLimpia)
                setLetraRequerida(palabraLimpia.charAt(palabraI.length))
                setPuntaje(punteja+palabraLimpia.length)
                console.log(palabrasUsadas, " | ", letraRequerida)
                setTiempo((tiempoAcutal) => 15)
            }

            console.log("Letra:", palabraI.charAt(palabraI.length))
            
            setIsGood(validador.data.exists)
            setPalabraI("")            

            console.log(palabrasCon)

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
        <div class="navBarContainer">
                <p>Palabras Encadendas</p>
                <p>Mejores Puntajes</p>
        </div>

        <div class="gameContainer">
        <Timer tiempo={tiempo} />
            <p class="puntajeNum">{punteja}</p>
            <div class="titleTextContainer">
                <p class="titleText textSize">Palabra con {letraRequerida.toUpperCase()}{palabraI}</p>
            </div>

            <div>
                <form onSubmit={validarPalabra} class="gameMain">
                    <p>{letraRequerida.toUpperCase()}</p>
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
