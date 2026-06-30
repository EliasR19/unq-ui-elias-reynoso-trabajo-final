import { useEffect, useState } from "react";

/*
- Inicia despues de poner la primera palabra
- 15 segundos
- Si la palabra es correcta se le suman 15 segundos
- Hasta que el tiempo no termine se sigue jugando
- Tiempo en 0 termina
*/

function Timer({tiempo}) {

    const formatearTimepo = (segundosActuales) => {
        const minutos = Math.floor(segundosActuales / 60);
        const segundos = segundosActuales % 60;

        const minFormateados = String(minutos).padStart(2,'0');
        const segFormateados = String(segundos).padStart(2,'0');

        return `${minFormateados}:${segFormateados}`
    }


  return (
    <>
        <h1 style={{fontFamily: 'Geo', fontSize: '80px'}}>{tiempo}</h1>
    </>
  );
}
export default Timer;