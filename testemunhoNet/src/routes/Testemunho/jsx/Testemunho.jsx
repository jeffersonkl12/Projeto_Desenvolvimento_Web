import Perfil from "../../../components/utils/Perfil";
import "../css/testemunho.css";
import { IoArrowRedoOutline } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/utils/Input";
import { useEffect, useState } from "react";
import useUsuario from "../../../hooks/useUsuario";
import axio from "axios";
import useToken from "../../../hooks/useToken";


const Comentario = ({ comentario, onClickDelete }) => {
    const { usuario } = useUsuario();

    const data = new Date(comentario.dataCriacao);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const dataFormatada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;

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
                                usuario && usuario.id === comentario.usuarioId ? (<>
                                    <li><a className="dropdown-item" >Editar</a></li>
                                    <li><a className="dropdown-item" onClick={onClickDelete}>Excluir</a></li>
                                </>) : null
                            }
                            <li><a className="dropdown-item">Denunciar</a></li>
                        </ul>
                    </div>

                </div>
                <div className="comentario__desc">
                    <p>{comentario ? comentario.conteudo : null}</p>
                    <p className="comentario__data">{dataFormatada}</p>
                </div>
            </div>
        </div>
    );
}


const ComentarioTestemunho = ({ testemunhoId, comentariosArray }) => {
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState(comentariosArray);
    const { token } = useToken();
    const { usuario } = useUsuario();

    useEffect(() => {
        if (comentariosArray) {
            setComentarios(comentariosArray);
        }
    }, []);

    const changeComentario = (texto) => {
        setComentario(texto.target.value);
    }

    const saveComentario = async () => {
        const auxComentario = comentarios.slice();

        if (comentario && comentario.length > 0) {

            let comentarioJson = {};
            comentarioJson.conteudo = comentario;
            comentarioJson.usuarioId = usuario.id;
            comentarioJson.testemunhoId = testemunhoId;


            const response = await axio.post("http://localhost:8080/comentario/", comentarioJson, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });



            if (response.status === 200) {

                const comentarioResponse = await axio.get(`http://localhost:8080/comentario/${response.data.id}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                });

                if (comentarioResponse.status === 200) {
                    auxComentario.push(comentarioResponse.data);
                    setComentarios(auxComentario);
                    setComentario("");
                }


            }


        }
    }

    const deleteComentario = async (indice) => {
        const auxComentario = comentarios.slice();
        const id = auxComentario[indice].id;
        const response = await axio.delete(`http://localhost:8080/comentario/${id}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })

        if (response.status === 200) {
            auxComentario.splice(indice, 1);
            setComentarios(auxComentario);
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
                        return <Comentario key={i}
                            comentario={v}
                            onClickDelete={() => deleteComentario(i)} />
                    }) : null
                }
            </div>
        </div>
    );
}


const Testemunho = () => {
    const { state } = useLocation();
    const [testemunho, setTestemunho] = useState(state);
    const navigate = useNavigate();
    const data = new Date(testemunho.dataCriacao);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const dataFormatada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;



    useEffect(() => {
        if (state) {
            setTestemunho(state);
            localStorage.setItem("testemuho", testemunho);
        } else {
            setTestemunho(localStorage.getItem("testemunho"));
        }

    }, [testemunho,state]);

    const clickEdit = () => {
        return navigate("/escrever-testemunho",{replace: true, state: testemunho});
    }

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
                    <p className="texto__edit">Última atualização: {dataFormatada}</p>
                </div>

                <div className="tetemunhos-conteudo__acoes">
                    <IoArrowRedoOutline />
                    <AiOutlineDownload />
                    <FiEdit onClick={clickEdit}/>
                </div>
                <div className="tetemunhos-conteudo__comentario-container">
                    <p className="texto__titulo">Comentarios</p>
                    <div className="tetemunhos-conteudo__comentario">
                        <div>
                            {
                                testemunho ? <ComentarioTestemunho
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