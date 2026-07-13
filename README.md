# 2026s1 - TP Integrador - Palabras Encadenadas

### Reglas del Juego

Una partida consiste en ingresar palabras que formen una cadena.

La primera palabra puede ser cualquier palabra válida y será la que inicie la cadena.

- A partir de la segunda palabra, cada nueva palabra debe cumplir las siguientes condiciones:
  -  Debe existir en el diccionario español.
  - No puede haber sido utilizada anteriormente durante la partida.
  - Debe comenzar con la última letra de la palabra válida anterior.
```
Ejemplo:
casa  -> árbol -> luna
```
### Puntaje

Cada letra de una palabra válida otorga 1 punto.
```
casa  -> 4 puntos
árbol -> 5 puntos
luna  -> 4 puntos

Total: 13 puntos
```
### Tiempo

- Cada turno tiene una duración de 15 segundos.
    - El contador comienza al ingresar la primera palabra.
    - Cada vez que el jugador ingresa una palabra válida, el contador vuelve a 15 segundos.
    - Mientras el tiempo no haya finalizado, el jugador puede seguir intentando ingresar palabras.
    - Si el contador llega a 0, la partida termina
 
## Dowload and Run
### Dowload
```
git clone https://github.com/EliasR19/unq-ui-elias-reynoso-trabajo-final.git
cd PalabrasEncadenadasTP
npm install
```

### Run
```
npm start
```
