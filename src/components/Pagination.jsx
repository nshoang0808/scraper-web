import React from 'react'
import '../pagination.css'

const Pagination = (props) => {
    const { currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.totalPages-1;

    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }

    const handleNextClick = ()=>{
        props.onNextClick();
    }

    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

            if(page <= maxPageLimit  && page > minPageLimit) {
                return(
                    <li key={page} id={page} onClick={handlePageClick}
                        className={currentPage===page ? 'active' : null}>
                        {page}
                    </li>
                );
            }else{
                return null;
            }
        }

    );

    let pageInc = null;
    if(pages.length > maxPageLimit){
        pageInc = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDec = null;
    if(minPageLimit >=1){
        pageDec = <li onClick={handlePrevClick}>&hellip;</li>
    }

    return (
        <ul className="pageNumbers">
            <li>
                <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>Prev</button>
            </li>
            {pageDec}
            {pageNumbers}
            {pageInc}
            <li>
                <button onClick={handleNextClick} disabled={currentPage === pages[pages.length-1]}>Next</button>
            </li>
        </ul>
    )
}

export default Pagination