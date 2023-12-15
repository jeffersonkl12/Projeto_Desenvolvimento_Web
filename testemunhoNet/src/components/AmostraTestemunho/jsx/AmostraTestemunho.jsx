import '../css/AmostraTestemunho.css'

export default function AmostraTestemunho({ testemunho, clickLink }) {
    const conteudo = testemunho.conteudo.length > 287 ? testemunho.conteudo.substring(0, 287) + "..." : testemunho.conteudo;
    const data = new Date(testemunho.dataCriacao);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const dataFormatada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;


    return (
        <>
            <div id="divAmostraTestemunho">
                <article>
                    <header>
                        <h1 id="tituloAmostraTestemunho">{testemunho.titulo}</h1>
                        <p>{conteudo}</p>
                    </header>
                    <footer>
                        <address>
                            <em><a href="#" className="link-perfil-usuario">{testemunho.autor.nome}</a></em> - <time >{dataFormatada}</time>
                        </address>
                        <a href="#" id="linkTestemunhoCompleto" onClick={() => clickLink(testemunho)}>Leia o testemunho completo</a>
                    </footer>
                </article>
            </div>
        </>
    )
}

