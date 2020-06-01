import React, { useState } from 'react';
import { registerUser } from '../api';
import { useHistory } from 'react-router-dom';

const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    age: 0,
    sex: 'male',
};

export const RegistrationPage = () => {
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    let history = useHistory();

    const getAgeOptions = () => {
        let options = [];
        for (let i = 1; i < 100; i++) {
            options.push((<option key={`age_${i}`} value={i}>{i}</option>));
        }
        return options;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors([]);
    };

    const handleFormSubmit = async (event) => {
        if (success) return;
        event.preventDefault();
        let validationErrors = validateFormData();
        if (validationErrors.length > 0) return;

        const { error } = await registerUser(formData);
        if (error) return setErrors([error]);

        setFormData(initialFormData);
        setSuccess(true);

        setTimeout(() => {
            history.push('/login')
        }, 2000);
    };

    const validateFormData = () => {
        let errorsArray = [];

        if (formData.firstName.length === 0 || formData.lastName.length === 0)
            errorsArray.push('* First Name and Last Name cannot be empty');

        if (formData.email.length < 6)
            errorsArray.push('* Invalid Email');

        if (formData.username.length < 6)
            errorsArray.push('* Invalid Username');

        if (formData.password.length < 5 || formData.password !== formData.confirmPassword)
            errorsArray.push('* Password length less than 5 or Password doesnt match');


        setErrors(errorsArray);

        return errorsArray;
    };

    return (
        <div className="registration-page">
            <div className="container">
                <h2 className="registration-page-title">
                    Signup Page
                </h2>
                <form className="registration-form" onSubmit={handleFormSubmit}>
                    {success && <div className="form-success">Account Created, you'll be redirected to login</div>}
                    {errors.length > 0 && <div className="form-errors">
                        {errors.map(error => <div key={error} className="form-error">{error}</div>)}
                    </div>}

                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input onChange={handleChange} name="firstName" id="firstName" type="text" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input onChange={handleChange} name="lastName" id="lastName" type="text" placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Your Username:</label>
                        <input onChange={handleChange} name="username" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email:</label>
                        <input onChange={handleChange} name="email" id="email" type="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} name="password" id="password" type="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input onChange={handleChange} name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirm Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sex">Your Gender</label>
                        <select onChange={handleChange} name="sex" id="sex">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Your Age:</label>
                        <select onChange={handleChange} name="age" id="age">
                            {getAgeOptions()}
                        </select>
                    </div>
                    <div className="form-group form-group-button">
                        <button className="btn">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;