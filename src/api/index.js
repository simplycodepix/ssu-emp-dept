import axios from 'axios';
import qs from 'querystring';
import { EMP, DEPT } from '../store/types';

const localApiURL = `http://localhost:8048/api`;
const apiURL = `http://empdept.god-development.com/api`;

// GET
export const getEmpData = async ({ limit, offset }) => {
    const { data } = await axios.get(`${apiURL}/crud/emp/get?limit=${limit}&offset=${offset}`);
    return data;
}

export const getDeptData = async ({ limit, offset }) => {
    const { data } = await axios.get(`${apiURL}/crud/dept/get?limit=${limit}&offset=${offset}`);
    return data;
}

// Auth
export const registerUser = async (userData) => {
    const { data } = await axios.post(`${apiURL}/user/registration`, qs.stringify(userData));
    return data;
}

export const authUser = async (credentials) => {
    const { data } = await axios.post(`${apiURL}/user/login`, qs.stringify(credentials));
    return data;
}

export const getUserProfile = async ({ id }) => {
    const { data } = await axios.get(`${apiURL}/user/${id}`);
    return data;
}

// ADD
export const addEmp = async ({ payload }) => {
    const { data } = await axios.post(`${apiURL}/crud/emp/add`, qs.stringify({ ...payload }));
    return data;
}

export const addDept = async ({ payload }) => {
    const { data } = await axios.post(`${apiURL}/crud/dept/add`, qs.stringify({ ...payload }));
    return data;
}

export const addDataToTable = async ({ table, payload }) => {
    let response;

    switch (table) {
        case EMP:
            response = await addEmp({ payload });
            break;
        case DEPT:
            response = await addDept({ payload });
            break;
        default:
            break;
    }

    return response;
};