import Form from "../../../components/utils/Form";
import RollBack from "../../../components/utils/RollBack";
import useUsuario from "../../../hooks/useUsuario";
import "../css/editarPerfil.css";

const EditarPerfil = () => {

    const { usuario } = useUsuario();

    return (
        <>
            <RollBack />
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="editar-perfil__container">
                    <Form perfil={usuario} />
                </div>
            </div>
        </>
    );
}

export default EditarPerfil;