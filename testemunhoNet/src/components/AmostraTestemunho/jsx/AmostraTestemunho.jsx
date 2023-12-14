import '../css/AmostraTestemunho.css'

export default function AmostraTestemunho({ testemunho, clickLink }) {
    const conteudo = testemunho.conteudo.length > 287 ? testemunho.conteudo.substring(0, 287) + "..." : testemunho.conteudo;

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
                            <em><a href="#" className="link-perfil-usuario">{testemunho.autor.nome}</a></em> - <time >2022/06/15 13:00</time>
                        </address>
                        <a href="#" id="linkTestemunhoCompleto" onClick={() => clickLink(testemunho)}>Leia o testemunho completo</a>
                    </footer>
                </article>
            </div>
        </>
    )
}

