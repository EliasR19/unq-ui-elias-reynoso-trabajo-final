import './GrupoLetras.css';

const GrupoLetras = ({letra, palabrasFiltradas, index}) => {
if (palabrasFiltradas.length === 0) return null;

  const tieneMuchasPalabras = palabrasFiltradas.length > 5;

  return (
    <div className='listaPalabrasFinal' key={`${letra}_${index}`}>   
        <p className='letraHeaderLista'>{letra.toUpperCase()}</p>                     
        
        <div className={`palabrasContainer ${tieneMuchasPalabras ? 'multiColumna' : ''}`}>
            {palabrasFiltradas.map((palabra, pIndex) => (
            <div className='listaLetraEspesifica' key={pIndex}>          
                <p>{palabra}</p>  
        </div>
        
        ))}    
        
        </div>
    </div>     
  );
}

export default GrupoLetras;