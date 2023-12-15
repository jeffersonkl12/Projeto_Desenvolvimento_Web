import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./form.css";
import Perfil from "./Perfil";
import axio from "axios";
import useUsuario from "../../hooks/useUsuario";

const Form = (Props) => {
    const [estados, setEstados] = useState([]);
    const [nome, setNome] = useState("");
    const [sobreNome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [estado, setEstado] = useState("");
    const [senha, setSenha] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
    const [image, setImage] = useState(null);
    const [campos, setCampos] = useState(null);
    const [error, setError] = useState("");

    const { saveUsuario } = useUsuario();
    const inputFileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const estadosAux = await axio.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            setEstados(estadosAux.data);
        })()

        setCampos(Props.perfil);

    }, []);

    const clickInputFileRef = () => {
        inputFileRef.current.click();
    }

    const sendFile = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const changeNome = (text) => {
        setNome(text.target.value);
    }

    const changeSobrenome = (text) => {
        setSobrenome(text.target.value);
    }

    const changeEmail = (text) => {
        setEmail(text.target.value);
    }

    const changeEstado = (text) => {
        setEstado(text.target.value);
    }

    const changeSenha = (text) => {
        setSenha(text.target.value);
    }

    const changeRepetirSenha = (text) => {
        setRepetirSenha(text.target.value);
    }

    const sendData = async () => {
        try {

            let usuario = {};

            nome ? usuario.nome = nome : null;
            sobreNome ? usuario.sobrenome = sobreNome : null;
            email ? usuario.email = email : null;
            estado ? usuario.estado = estado : null;

            if (senha && !repetirSenha) {
                throw new Error("senhas incompletas!");
            }

            if (!senha && repetirSenha) {
                throw new Error("senhas incompletas!");
            }

            if (senha && repetirSenha && senha !== repetirSenha) {
                throw new Error("senhas diferentes!");
            }

            if (senha && repetirSenha) {
                usuario.senha = senha;
            }


            const url = campos ? "http://localhost:8080/usuario/" + campos.id : "http://localhost:8080/cadastro";

            const response = await axio(url, {
                method: campos ? "PUT" : "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                data: usuario
            });

            if (response.status === 200 || response.status === 201) {
                setNome("");
                setSobrenome("");
                setEmail("");
                setEstado("");
                setError("");
                setSenha("");
                setRepetirSenha("");

                if (!campos) {
                    return navigate("/", { replace: true });
                }

                setCampos(response.data);
                saveUsuario(response.data);

            }
        } catch (e) {
            if (e.message === "senhas incompletas!") {
                setError("senhas incompletas!");
            } else if (e.message === "senhas diferentes!") {
                setError("senhas diferentes!");
            } else {
                console.log(e);
            }

        }
    }


    return (
        <div className="cadastro__form-container">
            <form>
                <div className="form-container__img d-flex flex-column align-items-center">
                    <Perfil />
                    <div className="form-container__perfil-btn">
                        <input type="file"
                            onClick={sendFile}
                            ref={inputFileRef}
                            hidden />
                        <Button onPress={clickInputFileRef} sm={true}>{campos ? "Editar Imagem" : "Escolher Imagem"}</Button>
                    </div>
                </div>
                <div className="form-container__entrada">
                    <div className="form-container__nome d-flex flex-row justify-content-between align-items-center">
                        <div>
                            <input type="text"
                                className="form-control"
                                placeholder={campos ? campos.nome : "Nome"}
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                                onChange={changeNome}
                                value={nome} />
                        </div>
                        <div>
                            <input type="text"
                                className="form-control"
                                placeholder={campos ? campos.sobrenome : "SobreNome"}
                                aria-label="SobreNome"
                                aria-describedby="basic-addon1"
                                onChange={changeSobrenome}
                                value={sobreNome} />
                        </div>
                    </div>

                    <div>
                        <input type="email"
                            className="form-control"
                            placeholder={campos ? campos.email : "Email"}
                            aria-label="Email"
                            aria-describedby="basic-addon1"
                            onChange={changeEmail}
                            value={email} />
                    </div>

                    <div>
                        <input type="password"
                            className="form-control"
                            placeholder="Senha"
                            aria-label="Senha"
                            aria-describedby="basic-addon1"
                            onChange={changeSenha}
                            value={senha} />
                    </div>
                    <div>
                        <input type="password"
                            className="form-control"
                            placeholder="Repetir Senha"
                            aria-label="Senha"
                            aria-describedby="basic-addon1"
                            onChange={changeRepetirSenha}
                            value={repetirSenha} />
                    </div>
                    <div>
                        <select className="form-select form-custom__select"
                            aria-label="Estado"
                            onChange={changeEstado}>
                            {
                                campos && !campos.estado ? <option selected>Escolha um estado</option> : null
                            }
                            {
                                estados ? estados.map((v, i) => {
                                    if (campos && campos.estado === v.nome) {
                                        return <option key={i}
                                            value={v.nome}
                                            selected>{v.nome}</option>
                                    } else {
                                        return <option key={i} value={v.nome}>{v.nome}</option>
                                    }
                                }) : null
                            }
                        </select>
                    </div>
                    <div>
                        <Button onPress={sendData}>{campos ? "Editar" : "Cadastrar"}</Button>
                        {
                            error ? <div className="alert alert-danger mt-4 d-flex align-items-center justify-content-center" role="alert">
                                <p className="error__editar-perfil">{error}</p>
                            </div> : null
                        }

                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;