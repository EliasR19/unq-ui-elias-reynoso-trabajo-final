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



export const listaEjemplo = [
  // Letras con muchas palabras (para forzar las 2 columnas)
  "arbol", "auto", "anana", "arena", "avion", "agua", "almohada", "anillo", "abeja", "arte", "asado", "astronauta",
  "barco", "bueno", "bota", "banco", "ballena", "blanco", "bolsa", "boca", "bici", "bonito", "búho", "bufanda",
  "casa", "cama", "cielo", "carro", "comida", "cuaderno", "cuchara", "cable", "camisa", "carta", "cine", "conejo",
  "dado", "dedo", "dia", "dulce", "dinosaurio", "disco", "diente", "dinero", "dibujo", "duende", "dorado", "delfín","auto","auto","auto","auto","auto","auto","auto",
  
  // Letras con pocas palabras (se mantienen en una sola columna)
  "elefante", "escuela", "enano",
  "fuego", "fresa", "flor",
  "gato", "goma", "guitarra",
  
  // El resto con palabras suficientes para activar las dos columnas (> 5)
  "hielo", "huevo", "humo", "hoja", "hilo", "harina", "hada",
  "isla", "iman", "iglesia", "iguanas", "idea", "invierno",
  "jabon", "jarra", "jardin", "juego", "jugo", "jirafa",
  "kilo", "kiosco", "karate", "wi-fi", "kiwi", "kayak",
  "luna", "lápiz", "limón", "libro", "luz", "lobo", "llave",
  "mano", "mesa", "mapa", "manzana", "miel", "mochila", "mono",
  "nube", "nido", "nota", "noche", "nieve", "naranja",
  "ñandú", "ñoqui", "ñame", "ñoñería", "ñato", "ñoñada",
  "oso", "ojo", "ola", "oro", "oreja", "oveja", "oscuro",
  "pato", "perro", "pelo", "papel", "piedra", "plátano", "puerta",
  "queso", "química", "quema", "quiosco", "querer", "quinto",
  "ratón", "reloj", "rojo", "rama", "río", "ropa", "rueda",
  "sol", "silla", "sopa", "sapo", "sal", "sueño", "sombrero",
  "tren", "taza", "tierra", "tigre", "tomate", "teléfono", "tijera",
  "uva", "uña", "universo", "uno", "urna", "utensilio",
  "vaca", "vaso", "viento", "verde", "ventana", "viaje",
  "waffle", "waterpolo", "web", "whisky", "walmart", "windsurf",
  "xilófono", "xenofobia", "xerografía", "xilema", "xenón", "erofobia",
  "yogur", "yo-yo", "yegua", "yema", "yeso", "yate",
  "zorro", "zapato", "zanahoria", "zigzag", "zona", "zoológico"
];

export const puntajesDePrueba = [
    { playerName: "Santi",  points: 950, errors: 1, hits:1 },
    { playerName: "Matias", points:  880, errors: 1, hits:2 },
    { playerName: "Valen",  points: 720, errors: 1, hits:3 },
    { playerName: "Goku",    points: 650, errors: 1, hits:4 },
    { playerName: "Elena",  points: 510, errors: 1, hits:5 },
    { playerName: "Juani",  points: 430, errors: 1, hits:6 },
    { playerName: "Lauty",  points: 390, errors: 1, hits:7 },
    { playerName: "Coscu",  points: 280, errors: 1, hits:8 },
    { playerName: "Spreen", points:  150, errors: 1, hits:9 },
    { playerName: "Messi",  points: 90, errors: 1, hits:10 }
    ];