import { useState } from "react";

function usePagination() {
    const [page, setPage] = useState(1)
    const handlePagination = (evt, value) => {
        setPage(value)
    }
    return [page, handlePagination]
}

export default usePagination