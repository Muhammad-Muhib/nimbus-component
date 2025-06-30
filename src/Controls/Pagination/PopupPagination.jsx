import React,{Fragment} from 'react';
import { Pagination } from 'react-bootstrap';

export default function PopupPaginationComp({ currentPage = 1, detailObjLength, setCurrentPage }) {
    const pageCount = Math.ceil(detailObjLength / 10);
    // Calculate the range of page numbers to display
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(pageCount, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    let items = [];
    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === currentPage}
                onClick={() => setCurrentPage(i)}
                aria-current={i === currentPage}
            >
                {i}
            </Pagination.Item>
        );
    }
    return (
        <div
            className='productPaginationContainer'
        >
            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {items}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount} />
                <Pagination.Last onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount} />
            </Pagination>
        </div>
    );
}
