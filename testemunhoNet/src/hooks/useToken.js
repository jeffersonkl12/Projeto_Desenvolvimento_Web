import {useState} from "react";


const useToken = () =>{
    const getToken = () =>{
        return localStorage.getItem("token");
    };

    const [token,setToken] = useState(getToken());

    const saveToken = (novoToken) => {
        localStorage.setItem("token",JSON.stringify(novoToken));
        setToken(novoToken);
    }
    
    const removeToken = () => {
        localStorage.removeItem("token");
        setToken(null)
    }

    return {
        token: token,
        saveToken: saveToken,
        removeToken: removeToken
    }
};

export default useToken;