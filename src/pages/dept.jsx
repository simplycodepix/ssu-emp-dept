import React, { useState, useEffect } from 'react';
import Tables from '../components/Tables/Tables';
import { getDeptData } from '../api';

export const DeptPage = () => {
    const [loading, setLoading] = useState(true);
    const [deptCount, setdeptCount] = useState(0);
    const [dept, setdept] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadTables({ limit: 6, offset: 0 });
    }, []);

    const loadTables = async ({ limit, offset }) => {
        setLoading(true);
        const { dept, count } = await getDeptData({ limit, offset });
        setdept(dept);
        setdeptCount(count);
        setLoading(false);
    }

    const changePage = (index) => {
        setCurrentPage(index);
        loadTables({ limit: 6, offset: (index - 1) * 6 })
    }

    return (
        <Tables table="dept" loading={loading} count={deptCount} data={dept} currentPage={currentPage} changePage={changePage} />
    );
};

export default DeptPage;