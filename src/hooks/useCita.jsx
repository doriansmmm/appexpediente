import { useContext } from "react";

import CitaContext from "../context/CitaProvider";

const useCita = () => {
    return useContext(CitaContext)
}

export default useCita