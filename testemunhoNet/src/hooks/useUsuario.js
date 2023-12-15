import {useState} from "react";


const useUsuario = () =>{
    const getUsuario = () =>{
        const usuarioAux = localStorage.getItem("usuario");
        return usuarioAux ? JSON.parse(usuarioAux): null;
    };

    const [usuario,setUsuario] = useState(getUsuario());

    const saveUsuario = (novoUsuario) => {
        localStorage.setItem("usuario",JSON.stringify(novoUsuario));
        setUsuario(novoUsuario);
    }
    
    const removeUsuario = () => {
        localStorage.removeItem("usuario");
        setUsuario(null);
    }

    return {
        usuario: usuario,
        saveUsuario: saveUsuario,
        removeUsuario: removeUsuario
    }
};

export default useUsuario;