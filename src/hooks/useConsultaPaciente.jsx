import { useContext } from "react";

import ConsultaPacienteContext from "../context/ConsultaPacienteProvider";

const useConsultaPaciente = () => {
    return useContext(ConsultaPacienteContext)
}

export default useConsultaPaciente