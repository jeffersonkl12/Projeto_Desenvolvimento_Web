import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css'
import "./components/utils/template.css";

import Home from "./routes/Home/jsx/Home";
import Template from "./routes/Template";
import Login from "./routes/Login/jsx/Login";
import Cadastro from "./routes/Cadastro/jsx/Cadastro";
import EditarPerfil from "./routes/EditarPerfil/jsx/EditarPerfil";
import EscreverTestemunho from "./routes/EscreverTestemunho/jsx/EscreverTestemunho";
import Testemunho from "./routes/Testemunho/jsx/Testemunho";
import useToken from "./hooks/useToken";
import useUsuario from "./hooks/useUsuario";



function App() {
  const [tokenAtual, setTokenAtual] = useState(useToken())
  const { token } = useToken();
  const { usuario } = useUsuario();

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      setTokenAtual(token);
    } else {
      setTokenAtual(null)
    }

  }, [token]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Template />}>
          <Route path="" element={<Home />} />
          <Route path="escrever-testemunho" element={tokenAtual ? <EscreverTestemunho /> : <Navigate to={"/login"} replace={true} />} />
          <Route path="testemunho" element={<Testemunho />} />
        </Route>
        <Route path="/editar-perfil" element={tokenAtual ? <EditarPerfil /> : <Navigate to={"/login"} replace={true} />} />
        <Route path="/login" element={<Login atualizaToken={setTokenAtual} />} />
        <Route path="/cadastro" element={tokenAtual ? <Navigate to={"/"} replace={true} /> : <Cadastro />} />
      </>
    ));


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
