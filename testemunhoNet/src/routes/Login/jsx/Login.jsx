import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../components/utils/Logo";
import "../css/login.css";
import Button from "../../../components/utils/Button";
import { useState } from "react";
import useToken from "../../../hooks/useToken";
import axios from "axios";
import useUsuario from "../../../hooks/useUsuario";
import RollBack from "../../../components/utils/RollBack";

const Login = ({ atualizaToken }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errorLogin, setErrorLogin] = useState(false);
    const { saveToken } = useToken();
    const { saveUsuario } = useUsuario();
    const navigate = useNavigate();


    const handleEmail = (texto) => {
        setEmail(texto.target.value);
    }

    const handleSenha = (texto) => {
        setSenha(texto.target.value);
    }



    const login = async () => {

        if (email && senha) {

            const header = new Headers();

            const basic = "Basic " + btoa(email + ":" + senha);

            header.set("Authorization", basic);
            header.set("Accept", "application/json");

            const tokenResponse = await fetch("http://localhost:8080/login",
                {
                    method: "POST",
                    headers: header,
                });

            if (tokenResponse.ok) {
                const token = await tokenResponse.json();

                // console.log(token.token);
                // header.set("Authorization", "Bearer " + token.token);

                const usuarioResponse = await axios.get("http://localhost:8080/usuario/perfil", {
                    headers: {
                        Authorization: "Bearer " + token.token
                    }
                })

                if (usuarioResponse.status === 200) {
                    const usuario = usuarioResponse.data;
                    localStorage.setItem("token", token.token);
                    saveUsuario(usuario);
                    saveToken(token.token);
                    atualizaToken(token.token);
                    return navigate("/", { replace: true });
                }

            }
        }

        setErrorLogin(true);
    }

    return (
        <>
            <RollBack />
            <div className="form__login-content">

                <div className="form-container__login">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Logo />
                    </div>
                    <form className="form__login-item">
                        <div className="input-group mb-3">
                            <input type="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                required
                                onChange={handleEmail}
                                value={email} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="password"
                                className="form-control"
                                placeholder="Senha"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                required
                                onChange={handleSenha}
                                value={senha} />
                        </div>
                        <div className="form__login-cadastro d-flex justify-content-center">
                            <div>
                                {
                                    errorLogin ? <p className="login-cadastro_error d-flex justify-content-center">Login invalido!</p> : null
                                }
                                <p>Não tem cadastro? <Link className="login-cadastro__link" to={"../cadastro"}>Cadastre-se</Link></p>
                            </div>
                        </div>
                        <div className="form__logim-btn" >
                            <Button onPress={login}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;