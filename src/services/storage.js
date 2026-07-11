import { puntajesDePrueba } from "./utils";

export const actualizarTop = (listaPuntajeNuevo) => {
    localStorage.setItem("top10", JSON.stringify(listaPuntajeNuevo));
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
