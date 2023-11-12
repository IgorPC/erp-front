import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DefaultPaginationProps from './DefaultPaginationProps';

import './DefaultPagination.css';

const DefaultPagination: React.FC<DefaultPaginationProps> = ({currentPage, totalOfPages, callback}) => {
    const [page, setPage] = useState(currentPage)

    const handlePageChange = (event: any, value: number) => {
        setPage(value)
        callback(value)
    }

    return (
        <div className="paginationContainer">
            <div className="paginationContainerContent">
                <Stack spacing={2}>
                    <Pagination
                        onChange={handlePageChange} 
                        page={page} 
                        count={totalOfPages} 
                        variant="outlined" 
                        color="primary" 
                    />
                </Stack>
            </div>
        </div>
    )
}

export default DefaultPagination