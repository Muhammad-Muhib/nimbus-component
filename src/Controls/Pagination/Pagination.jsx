import { Pagination, Form } from 'react-bootstrap';

export default function PaginationComp({ currentPage = 1, detailObjLength, rowsPerPage, setRowsPerPage, setCurrentPage }) {
    const pageCount = Math.ceil(detailObjLength / rowsPerPage);
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

    // Options for rows per page
     const rowsPerPageOptions = [5, 10, 20, 50, 100];

    return (
        <div
            className='tablePaginationContainer'
        >
             <Form.Group controlId="rowsPerPageDropdown">
                <Form.Control
                    as="select"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to the first page when rows per page changes
                    }}
                    className="rowsPerPage"
                >
                    {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group> 
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
