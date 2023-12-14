import Perfil from "../../../components/utils/Perfil";
import "../css/testemunho.css";
import { IoArrowRedoOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Input from "../../../components/utils/Input";
import { useEffect, useState } from "react";


const Comentario = ({ comentario }) => {
    const [usuarioAtual, setUsuarioAtual] = useState();

    useEffect(() => {
        localStorage.setItem("usuario", JSON.stringify({
            "id": 2,
            "nome": "sousa",
            "email": "jeffersonkl15@gmail.com",
            "senha": "1234"
        }));

        const usuario = localStorage.getItem("usuario");
        setUsuarioAtual(JSON.parse(usuario));
    }, []);

    return (
        <div className="comentario__container d-flex flex-row">
            <div className="comentario__perfil-container">
                <Perfil classe="comentario__perfil" />
            </div>
            <div className="comentario-info">
                <div className="comentario__autor d-flex flex-row align-items-center justify-content-between">
                    <p>{comentario ? comentario.autor.nome : null}</p>
                    <div className="dropdown">
                        <div className="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <CiMenuKebab />
                        </div>
                        <ul className="dropdown-menu dropdown-comentario">
                            {
                                usuarioAtual && usuarioAtual.id === comentario.usuarioId ? (<>
                                    <li><a className="dropdown-item" href="#">Editar</a></li>
                                    <li><a className="dropdown-item" href="#">Excluir</a></li>
                                </>) : null
                            }
                            <li><a className="dropdown-item" href="#">Denunciar</a></li>
                        </ul>
                    </div>

                </div>
                <div className="comentario__desc">
                    <p>{comentario ? comentario.conteudo : null}</p>
                    <p className="comentario__data">04/01/2023</p>
                </div>
            </div>
        </div>
    );
}


const ComentarioTestemunho = ({ usuario, testemunhoId, comentariosArray }) => {
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState(comentariosArray)

    useEffect(() => {
        if (comentariosArray) {
            console.log(comentariosArray);
            setComentarios(comentariosArray);
        }
    }, []);

    const changeComentario = (texto) => {
        setComentario(texto.target.value);
    }

    const saveComentario = async () => {
        const auxComentario = comentarios.slice();


        if (comentario && comentario.length > 0) {
            const response = await (await fetch("http://localhost:8080/comentario/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    conteudo: comentario,
                    usuarioId: usuario.id,
                    testemunhoId: testemunhoId
                })
            })).json();

            const responseComentario = await (await fetch(`http://localhost:8080/comentario/${response.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })).json();


            console.log(auxComentario);
            auxComentario.push(response);
            setComentarios(auxComentario);
            setComentario("");
        }
    }

    return (
        <div className="comentario-testemunho__container">
            <div className="add-comentario d-flex flex-row align-items-center">
                <Input filled placeHolder="Adicione um comentário..."
                    change={changeComentario}
                    value={comentario} />
                <button type="button" className="btn btn-success" onClick={saveComentario}>Comentar</button>
                <button type="button" className="btn btn-danger">Cancelar</button>
            </div>
            <div>
                {
                    comentarios ? comentarios.map((v, i) => {
                        return <Comentario key={i} comentario={v} />
                    }) : null
                }
                {/* <Comentario/>
                <Comentario />
                <Comentario />
                <Comentario />
                <Comentario />
                <Comentario /> */}
            </div>
        </div>
    );
}


const Testemunho = () => {
    const [testemunho, setTestemunho] = useState();
    const { state } = useLocation();


    const setLocalStorage = (chave, item) => {
        localStorage.setItem(chave, item);
    }

    const getLocalStorage = (chave) => {
        return localStorage.getItem(chave);
    }

    useEffect(() => {
        if (state) {
            setTestemunho(state);
            setLocalStorage("testemunho", JSON.stringify(state));
        }
    }, []);

    useEffect(() => {
        const testemunhoLocal = getLocalStorage("testemunho");
        if (!testemunho && testemunhoLocal) {
            setTestemunho(JSON.parse(testemunhoLocal));
        }
    }, [testemunho]);

    return (
        <div className="tetemunhos-container">
            <div className="tetemunhos-conteudo">
                <div className="tetemunhos-conteudo__perfil">
                    <Perfil />
                </div>
                <div className="tetemunhos-conteudo__autor">
                    <p>Autor: <span>{testemunho ? testemunho.autor.nome : null}</span></p>
                </div>
                <div className="tetemunhos-conteudo__texto">
                    <p className="texto__titulo">{testemunho ? testemunho.titulo : null}</p>
                    <div>
                        <p>{testemunho ? testemunho.conteudo : null}</p>

                    </div>
                    <p className="texto__edit">Última atualização: 26 - 12 -2022</p>
                </div>

                <div className="tetemunhos-conteudo__acoes">
                    <IoArrowRedoOutline />
                    <AiOutlineDownload />
                    <FiEdit />
                </div>
                <div className="tetemunhos-conteudo__comentario-container">
                    <p className="texto__titulo">Comentarios</p>
                    <div className="tetemunhos-conteudo__comentario">
                        <div>
                            {
                                testemunho ? <ComentarioTestemunho usuario={testemunho ? testemunho.autor : null}
                                    testemunhoId={testemunho ? testemunho.id : null}
                                    comentariosArray={testemunho ? testemunho.comentarios : null} /> : null
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Testemunho;