import { Outlet, ScrollRestoration } from "react-router-dom";
import BarraNavegacao from "../components/BarraNavegacao/jsx/BarraNavegacao";
import Rodape from "../components/Rodape/jsx/Rodape";

const Template = () => {
    return (
        <>
            <BarraNavegacao />
            <div className="main-content-template">
            <ScrollRestoration />
                <Outlet />
            </div>
            <Rodape />
        </>
    )
}

export default Template;