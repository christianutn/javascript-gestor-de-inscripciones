
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { FormularioInscripcion } from './components/FormularioInscripcion.jsx'
import 'bootswatch/dist/flatly/bootstrap.min.css'

export const App = () => {
 

  return (

    <>
      <BrowserRouter>

        <Routes>

          
          <Route path='/login' element={<Login />} />

          <Route path='/formulario-inscripcion' element={<FormularioInscripcion />} />
          
          
          
        </Routes>


      </BrowserRouter>
    </>
  )
}


