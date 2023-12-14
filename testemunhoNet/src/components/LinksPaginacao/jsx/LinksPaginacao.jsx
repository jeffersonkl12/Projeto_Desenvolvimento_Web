import { useEffect, useState } from "react";
import "../css/LinksPaginacao.css"
import { FaAngleLeft , FaAngleRight } from "react-icons/fa6";


export default function LinksPaginacao({postToPag,totalPag, paginacao}) {

    const pageNumero = [];

    for (let x = 0; x < Math.ceil(totalPag / postToPag); x++){
        pageNumero.push(x);
    }

    const pagClick = (indice) => {
        paginacao(indice);
    }

    return (
        <>  
            
            <nav aria-label="Page navigation example" id="navPaginação" >
                <ul className="pagination">
                    <li className="page-item"><a className="page-link linkPaginacao" href="#" ><FaAngleLeft /></a></li>
                    {
                        pageNumero.map((v,i) => {
                            return <li className="page-item" key={i}><a className="page-link linkPaginacao" href="#" onClick={()=>{pagClick(v * 3)}}>{v+1}</a></li>
                        })
                    }
                    <li className="page-item"><a className="page-link linkPaginacao" href="#"><FaAngleRight /></a></li>
                </ul>
            </nav>
            
        </>
    )
}