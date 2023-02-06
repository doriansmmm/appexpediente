import { useContext } from "react";

import HistorialCitasDisponiblesContext from "../context/HistorialCitasDisponiblesProvider";

const useHistorialCitasDisponibles = () => {
    return useContext(HistorialCitasDisponiblesContext)
}

export default useHistorialCitasDisponibles