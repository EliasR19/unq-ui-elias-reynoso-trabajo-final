import axios from 'axios';

const url = `https://word-api-hmlg.vercel.app/api/validate?word=`

export const verificarPalabra =  (palabra) => {
     return axios.get(url+palabra);
}

export const listaEjemplo = [
                                   "arbol",
                                   "barco",
                                   "casa",
                                   "dado",
                                   "elefante",
                                   "fuego",
                                   "gato",
                                   "hielo",
                                   "isla",
                                   "jirafa",
                                   "kilo",
                                   "luna",
                                   "mano",
                                   "nube",
                                   "ñandu",
                                   "ojo",
                                   "perro",
                                   "queso",
                                   "raton",
                                   "sol",
                                   "tigre",
                                   "uva",
                                   "viento",
                                   "web",
                                   "xilofono",
                                   "yogur",
                                   "zapato"
                                   ]