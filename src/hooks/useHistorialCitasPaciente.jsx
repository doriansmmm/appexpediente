import { useContext } from "react";

import HistorialCitasPacienteContext from "../context/HistorialCitasPacienteProvider";

const useHistorialCitasPaciente = () => {
    return useContext(HistorialCitasPacienteContext)
}

export default useHistorialCitasPaciente