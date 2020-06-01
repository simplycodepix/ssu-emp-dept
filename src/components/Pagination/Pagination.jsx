import React from 'react';

import './Pagination.scss';

export const PaginationItem = ({ index, current, onClick }) => (
    <li className={`pagination-item ${current ? 'current' : ''}`} onClick={() => onClick(index)}>{index}</li>
);

export const Pagination = ({ count, perPage = 6, currentPage, onClick }) => {
    const getItems = (count, perPage) => {
        let items = [];
        for (let i = 1; i <= Math.ceil(count / perPage); i++) {
            items.push(<PaginationItem current={currentPage === i} key={`pagination_${i}`} onClick={onClick} index={i} />)
        }
        return items;
    };
    return (
        <div className="pagination">
            <ul className="pagination-list">
                {getItems(count, perPage)}
            </ul>
        </div>
    );
};

export default Pagination;