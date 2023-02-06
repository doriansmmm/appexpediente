import { useContext } from "react";

import ConsultaContext from "../context/ConsultaProvider";

const useConsulta = () => {
    return useContext(ConsultaContext)
}

export default useConsulta