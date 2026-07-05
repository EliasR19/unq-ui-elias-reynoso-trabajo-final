import { puntajesDePrueba } from "./utils";

export const actualizarLeaderBoard = (nombre, puntaje, errores) => {
    const puntajesGuardados = localStorage.getItem("top10");
    let listaPuntaje = puntajesGuardados ? JSON.parse(puntajesGuardados) : [];

    const actual = {playerName: nombre, points: puntaje, errors: errores};
    listaPuntaje.push(actual);
    listaPuntaje.sort((a,b) => b.points - a.points);
    listaPuntaje = listaPuntaje.slice(0,10);

    localStorage.setItem("top10", JSON.stringify(listaPuntaje));

}

export const obtenerTop = () => {
    const datos = localStorage.getItem("top10");
    return datos ? JSON.parse(datos) : [];
}


export const inicializarPuntajesDePrueba = () => {
    if (!localStorage.getItem("top10")) {
        localStorage.setItem("top10", JSON.stringify(puntajesDePrueba));
        console.log("¡Puntajes de prueba cargados con éxito!");
    }
};
