
import Form from "../../../components/utils/Form";
import RollBack from "../../../components/utils/RollBack";
import "../css/cadastro.css";


const Cadastro = () => {


    return (
        <>
            <RollBack />
            <div className="cadastro__container d-flex flex-row justify-content-center align-items-center">
                <div className="cadastro__content">
                    <Form />
                </div>
            </div>
        </>
    );
}

export default Cadastro;