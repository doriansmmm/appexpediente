//importar librerias
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

//importar componentes
import Registro from "./components/registro/Registro";
import Login from './components/login/Login';
import Modulos from './components/modulos/Modulos';
import Cita from './components/cita/registro/Cita';
import HistorialPaciente from './components/cita/historial/HistorialPaciente';
import HistorialMedico from './components/medico/historialmedico/HistorialMedico';
import HistorialDisponibles  from './components/medico/historialdisponibles/HistorialDisponibles'
import Consulta from './components/medico/consulta/Consulta'
import Receta from './components/medico/receta/Receta'

//importar context
import { AuthProvider } from './context/AuthProvider'


export default function App() {


  return (<>

    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registro" element={<Registro />} />
          <Route exact path="/modulos" element={<Modulos />} />
          <Route exact path="/cita" element={<Cita />} />
          <Route exact path="/historialcitas" element={<HistorialPaciente />} />
          <Route exact path="/medico" element={<HistorialMedico />} />
          <Route exact path="/citasdisponibles" element={<HistorialDisponibles />} />
          <Route exact path="/consulta" element={<Consulta />} />
          <Route exact path="/receta" element={<Receta />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>

  </>);
}
