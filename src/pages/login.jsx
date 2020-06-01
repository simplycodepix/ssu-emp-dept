import React, { useState, useContext } from 'react';
import { authUser } from '../api';
import { AuthContext } from '../store/AuthProvider';

const initialFormData = {
    login: '',
    password: ''
}

export const LoginPage = () => {
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const { logIn } = useContext(AuthContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors([]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let validationErrors = validateFormData();
        if (validationErrors.length > 0) return;

        const { user, error } = await authUser(formData);
        if (error) return setErrors([error]);

        logIn(user);
    };

    const validateFormData = () => {
        let errorsArray = [];

        if (formData.login.length < 6)
            errorsArray.push('* Invalid login');

        if (formData.password.length < 5)
            errorsArray.push('* Password length less than 5');

        setErrors(errorsArray);
        return errorsArray;
    };

    return (
        <div className="login-page">
            <div className="container">
                <h2 className="login-page-title">
                    Login Page
                </h2>
                <form className="login-form" onSubmit={handleFormSubmit}>
                    {errors.length > 0 && <div className="form-errors">
                        {errors.map(error => <div key={error} className="form-error">{error}</div>)}
                    </div>}
                    <div className="form-group">
                        <input onChange={handleChange} name="login" type="text" placeholder="Email or username" />
                    </div>
                    <div className="form-group">
                        <input onChange={handleChange} name="password" type="password" placeholder="Password" />
                    </div>
                    <div className="form-group form-group-button">
                        <button className="btn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;