import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [isGood, setIsGood] = useState(null);
  const [palabraI, setPalabraI] = useState("")
  const [letraRequerida, setLetraRequerida] = useState("A")

  const [palabrasUsadas, setPalabrasUsadas] = useState([])

  useEffect(() => {
    if(palabraI.trim() !== ""){
      setIsGood(null) 
    }
  }, [palabraI])


  const validarPalabra = async (e) => {
    e.preventDefault();
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
          palabrasUsadas.push(letraRequerida+palabraI)
          setLetraRequerida(palabraLimpia.charAt(palabraI.length))
          console.log(palabrasUsadas, " | ", letraRequerida)
        }
        setIsGood(validador.data.exists)
        setPalabraI("")             
        
        return;
              
      } catch(error){
        console.log(error)
      }
    }

    
  return (
    <>
      <section id="center">
        <div>
          <h1>La palabra "{letraRequerida}{palabraI}"</h1>
            <form onSubmit={validarPalabra}>
              <span>{letraRequerida}</span>
              <input 
                type="text"
                value={palabraI}
                onChange={(e) => setPalabraI(e.target.value)}
                placeholder='...'
                style={{
                  border: 'none',
                  outline: 'none',
                  padding: '0',
                  fontSize: '16px',
                  width: '150px'
                }}
                />
                <button type="submit">Enviar</button>
              <p>Es valida? {isGood == null ? "Ingrese Palabra": isGood ? "True" : "False"} </p>
            </form>
            <p>Lista con las ultimas 10 palabras</p>
            <div>
              {palabrasUsadas.map((palabra, index) =>(
                <li key={index}>
                  <strong>{palabra}</strong>
                </li>
              ))}
            </div>
        </div>
      </section>

    </>
  )
}

export default App
