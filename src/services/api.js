import axios from 'axios';

const url = `https://word-api-hmlg.vercel.app/api/validate?word=`

export const verificarPalabra =  (palabra) => {
     return axios.get(url+palabra);
}

