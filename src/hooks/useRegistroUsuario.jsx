import { useContext } from "react";

import RegistroUsuarioContext from "../context/RegistroUsuarioProvider";

const useRegistroUsuario = () => {
    return useContext(RegistroUsuarioContext)
}

export default useRegistroUsuario