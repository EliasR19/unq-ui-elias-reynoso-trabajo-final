import { puntajesDePrueba } from "./utils";

export const actualizarLeaderBoard = (nombre, puntaje, errores, hits) => {
    const puntajesGuardados = localStorage.getItem("top10");
    let listaPuntaje = puntajesGuardados ? JSON.parse(puntajesGuardados) : [];

    const actual = {playerName: nombre, points: puntaje, errors: errores, hits:hits};
    listaPuntaje.push(actual);
    listaPuntaje.sort((a,b) => {

        //Compara puntos (El que mas tenga se queda)
        if(b.points !== a.points){
            console.log("A");
            
            return b.points - a.points;
        }
        //Compara palabras correctas (El que mas tenga se queda)
        if(b.hits !== a.hits){
            console.log("B");
            
            return b.hits - a.hits
        }
        console.log("C");
        
        //Compara errores. (El que menos tenga se queda)
        return a.errors - b.errors
    });
    
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
