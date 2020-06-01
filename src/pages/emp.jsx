import React, { useState, useEffect } from 'react';
import Tables from '../components/Tables/Tables';
import { getEmpData } from '../api';

export const EmpPage = () => {
    const [loading, setLoading] = useState(true);
    const [empCount, setEmpCount] = useState(0);
    const [emp, setEmp] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadTables({ limit: 6, offset: 0 });
    }, []);

    const loadTables = async ({ limit, offset }) => {
        setLoading(true);
        const { emp, count } = await getEmpData({ limit, offset });
        setEmp(emp);
        setEmpCount(count);
        setLoading(false);
    }

    const changePage = (index) => {
        setCurrentPage(index);
        loadTables({ limit: 6, offset: (index - 1) * 6 })
    }

    return (
        <Tables table="emp" loading={loading} count={empCount} data={emp} currentPage={currentPage} changePage={changePage} />
    );
};

export default EmpPage;