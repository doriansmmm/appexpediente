import { useContext } from "react";

import HistorialMedicoContext from "../context/HistorialMedicoProvider";

const useHistorialMedico = () => {
    return useContext(HistorialMedicoContext)
}

export default useHistorialMedico