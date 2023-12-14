import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import { createContext } from "react";
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
import { useAuth } from "./context/authProvider";
import { element } from "prop-types";
// import useToken from "./hooks/useToken";


function App() {
  const { token } = useToken();


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Template />}>
          <Route path="" element={<Home />} />
          <Route path="escrever-testemunho" element={token ? <EscreverTestemunho />: <Navigate to={"/login"} replace={true}/>} />
          <Route path="testemunho" element={<Testemunho />} />
        </Route>
        <Route path="/editar-perfil" element={token ? <EditarPerfil />: <Navigate to={"/login"} replace={true}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </>
    ));


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
