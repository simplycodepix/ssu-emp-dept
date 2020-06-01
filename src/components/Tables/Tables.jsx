import React from 'react';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';

import './Tables.scss';

export const Tables = ({ loading, count, currentPage, changePage, table, data = [] }) => {
    return (
        <div className="tables">
            <div className="container">
                <div className="add-new">
                    <Link className="btn" to={`${table}/add`}>Add new</Link>
                </div>
                {loading && <div className="loading">Loading...</div>}
                <div className="tables-list">
                    {data.map(one => <Card table={table} key={JSON.stringify(one)} data={one} />)}
                </div>
                <Pagination onClick={changePage} count={count} currentPage={currentPage} />
            </div>
        </div>
    );
};

export default Tables;