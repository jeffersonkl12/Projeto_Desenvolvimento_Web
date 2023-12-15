import "./perfil.css";
import trump from "../../../public/imgs/trump.png";
import padrao from "../../../public/imgs/default.png"

const Perfil = (Props) => {
    return (
        <div>
            <div className={`perfil-img__container ${Props.classe}`}>
                <img className="perfil__img" src={padrao} />
            </div>
        </div>
    );
}

export default Perfil;