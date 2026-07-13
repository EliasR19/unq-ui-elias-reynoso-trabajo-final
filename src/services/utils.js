import { obtenerTop, actualizarTop} from "./storage";

export const normlizarPalabra = (palabra) => {return palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();};

export const letrasAbecedarios = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q','r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
export const numeracion = ["1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH", "8TH", "9TH", "10TH"];


export const actualizarLeaderBoard = (nombre, puntaje, errores, hits) => {
    let puntajesGuardados = obtenerTop();

    const actual = {playerName: nombre, points: puntaje, errors: errores, hits:hits};

    puntajesGuardados.push(actual);
    puntajesGuardados.sort((a,b) => {

        //Compara puntos (El que mas tenga se queda)
        if(b.points !== a.points){ 
            return b.points - a.points;
        }
        //Compara palabras correctas (El que mas tenga se queda)
        if(b.hits !== a.hits){
            return b.hits - a.hits
        }
        //Compara errores. (El que menos tenga se queda)
        return a.errors - b.errors
    });
    
    puntajesGuardados = puntajesGuardados.slice(0,10);
    actualizarTop(puntajesGuardados)

}
