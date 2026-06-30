import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PalabrasEncadenadas from './components/PalabrasEncadenadas.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PalabrasEncadenadas />
  </StrictMode>,
)
