import { ImArrowLeft } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import "./RollBack.css";

const RollBack = () => {
    const navigate = useNavigate();

    return (
        <div className="rollback-container">
            <span onClick={() => navigate("/", { replace: true })}>
                <ImArrowLeft size={40}/>
            </span>
        </div>
    )
}

export default RollBack;