import '../css/BarraNavegacao.css'
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


function BarraNavegacao() {
    const navigate = useNavigate();


    const clickLink = (path, data = null) => {
        return navigate(path, { state: data });
    }

    return (
        <>
            <nav className="navbar bg-light fixed-top sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><span className="colorSteelBlue">Testemunho.Net</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title colorSteelBlue" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#" onClick={()=>clickLink("/")}>
                                        <span className=" colorSteelBlue link">Início</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">
                                        <span className="colorSteelBlue link">Perfil</span>
                                    </a>
                                </li>
                            </ul>
                            <form className="d-flex mt-3" role="search">
                                <input className="form-control me-1" type="search" placeholder="" aria-label="Search" />
                                <button className="btn" type="submit" id="lupinhaPesquisa"><BsSearch /></button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default BarraNavegacao