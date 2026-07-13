export const actualizarTop = (listaPuntajeNuevo) => {
    localStorage.setItem("top10", JSON.stringify(listaPuntajeNuevo));
}

export const obtenerTop = () => {
    const datos = localStorage.getItem("top10");
    return datos ? JSON.parse(datos) : [];
}


