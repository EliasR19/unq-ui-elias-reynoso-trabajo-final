import { useEffect, useState } from "react";
import './Timer.css';
/*
- Inicia despues de poner la primera palabra
- 15 segundos
- Si la palabra es correcta se le suman 15 segundos
- Hasta que el tiempo no termine se sigue jugando
- Tiempo en 0 termina
*/

function Timer({tiempo}) {
    const TIEMPO_MAXIMO = 15;
    const formatearTimepo = (segundosActuales) => {
        const minutos = Math.floor(segundosActuales / 60);
        const segundos = segundosActuales % 60;

        const minFormateados = String(minutos).padStart(2,'0');
        const segFormateados = String(segundos).padStart(2,'0');

        return `${minFormateados}:${segFormateados}`
    }

    const restante = (tiempo / TIEMPO_MAXIMO) * 100;

    const colorAlerta = (() => {
      if(tiempo <= 5 && tiempo >= 0)return 'red'
      if(tiempo <= 10 && tiempo > 5)return 'yellow'
      return 'green'
      
    })

  return (
    <div className="timerContainer">
        <h1 style={{fontFamily: 'Geo', fontSize: '80px'}}>{tiempo}</h1>
        
        <div className="timerBarProgressContainer">
          <div className={`timerBarProgress`} 
            style={{width: `${restante}%`,
                    backgroundColor: colorAlerta()}}>
          </div>

        </div>
    </div>
  );
}
export default Timer;