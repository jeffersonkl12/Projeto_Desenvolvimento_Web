import { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import Button from "../../../components/utils/Button";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axio from "axios";
import "../css/escreverTestemunho.css";
import useUsuario from "../../../hooks/useUsuario";
import useToken from "../../../hooks/useToken";

const EscreverTestemunho = () => {
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [show, setShow] = useState(false);
    const location = useLocation();
    const {state} = location;
    const [testemunhoEdit,setEditestemunho] = useState();
    const { usuario } = useUsuario();
    const {token} = useToken();
    
    useEffect(()=>{

        if(state){
            setEditestemunho(state);
            setTitulo(state.titulo);
            setConteudo(state.conteudo);
        }

    },[]);

    const changeTitulo = (text) => {
        setTitulo(text.target.value);
    }

    const changeConteudo = (text) => {
        setConteudo(text.target.value);
    }

    const sendTestemunho = async () => {
        try {
            if (!titulo || !conteudo) {
                throw new Error("titulo e conteudo não podem serem vazias");
            }

            let testemunho = {};
            testemunho.titulo = titulo;
            testemunho.conteudo = conteudo;
            testemunho.autorId = usuario.id;

            const url = testemunhoEdit ? `http://localhost:8080/testemunho/${testemunhoEdit.id}`: "http://localhost:8080/testemunho";

            const response = await axio(url,{
                method: testemunhoEdit ? "PUT": "POST",
                headers: {
                    Authorization: "Bearer "+token
                },
                data: testemunho
            });
            if (response.status === 200) {
                setTitulo("");
                setConteudo("");
                setShow(true);
            }

        } catch (e) {
            console.log(e);
        }
    }



    return (
        <>
            <ToastContainer position="middle-center" className="p-3" style={{ zIndex: 1 }}>
                <Toast bg="success"
                    show={show}
                    delay={2000}
                    onClose={() => setShow(false)}
                    autohide>
                    <Toast.Header >
                        <strong className="me-auto">Sucesso!</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Testemunho enviado com sucesso</Toast.Body>
                </Toast>
            </ToastContainer>

            <div className="escrever-container">
                <div className="escrever-container__conteudo">
                    <form>
                        <div className="escrever-container__item escrever-container__entrada escrever-container__entrada-titulo">
                            <p>Escolha um título:</p>
                            <input type="text"
                                className="form-control"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={changeTitulo}
                                value={titulo}></input>
                        </div>
                        <div className="escrever-container__item escrever-container__entrada escrever-container__entrada-conteudo">
                            <p>Escreva o seu testemunho:</p>
                            <textarea className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                onChange={changeConteudo}
                                value={conteudo}></textarea>
                        </div>
                        <div className="escrever-container__item escrever-container__publicacao">
                            <p>Comentários na publicação:</p>
                            <div className="publicacao__container">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                                    <label className="form-check-label" >
                                        Ativado
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label">
                                        Desativado
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="escrever-container__item escrever-container__button">
                            <Button onPress={sendTestemunho}>Publicar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EscreverTestemunho;