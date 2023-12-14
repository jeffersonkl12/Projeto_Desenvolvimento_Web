import {useState} from "react";


const useToken = () =>{
    const getToken = () =>{
        return sessionStorage.getItem("token");
    };

    const [token,setToken] = useState(getToken());

    const saveToken = (novoToken) => {
        sessionStorage.setItem("token",JSON.stringify(novoToken));
        setToken(novoToken);
    }   

    return {
        token: token,
        saveToken: saveToken
    }
};

export default useToken;