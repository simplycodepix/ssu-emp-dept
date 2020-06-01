import React, { useEffect, useState } from 'react';
import { EMP } from '../../store/types';
import { addDataToTable } from '../../api';
import { useHistory } from 'react-router-dom';

export const EditFormInput = ({ type = "text", name, value, onChange }) => (
    <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <input id={name} type={type} onChange={onChange} name={name} value={value} className="form-control" />
    </div>
);

const deptTableFields = [
    {
        name: 'deptno',
        type: 'number'
    },
    {
        name: 'dname',
        type: 'text'
    },
    {
        name: 'loc',
        type: 'text'
    }
];

const empTableFields = [
    {
        name: 'empno',
        type: 'number'
    },
    {
        name: 'ename',
        type: 'text'
    },
    {
        name: 'job',
        type: 'text'
    },
    {
        name: 'mgr',
        type: 'number'
    },
    {
        name: 'hiredate',
        type: 'date'
    },
    {
        name: 'sal',
        type: 'number'
    },
    {
        name: 'comm',
        type: 'number'
    },
    {
        name: 'deptno',
        type: 'number'
    }
];

export const EditForm = ({ match }) => {
    const [formData, setFormData] = useState({});
    const [table, setTable] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    let history = useHistory();

    useEffect(() => {
        let table = match.params.table;
        setTable(table);
    }, [match]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { result, error } = await addDataToTable({ table, payload: formData });

        if (!error && result) setSuccess(true);
        else setError(error);
        setLoading(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (success) setSuccess(false);
        if (error) setError(false);
        setLoading(false);

        setFormData({ ...formData, [name]: value })
    }

    const getForm = () => {
        let inputs = [];
        const fields = table === EMP ? empTableFields : deptTableFields;

        for (let one of fields) {
            inputs.push(<EditFormInput onChange={handleChange} key={one.name} name={one.name} type={one.type} />)
        }

        return inputs;
    };

    const onCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <div className="edit-page">
            <div className="container">
                {table && <h2 className="edit-page-title">Add {table}</h2>}
                {table && <form className="edit-form" onSubmit={handleSubmit}>
                    {success && <div className="form-success">Saved</div>}
                    {error && <div className="form-error">{error}</div>}

                    {getForm(table)}

                    <div className="form-group center-text">
                        <button onClick={onCancel} className="btn btn-cancel">Back</button>
                        <button disabled={loading} className="btn">Save</button>
                    </div>
                </form>}
            </div>
        </div>
    )
};

export default EditForm;