import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { instituteLogin } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'

const InstituteLogin = () => {
    const cookies = new Cookies();

    const [loginErrors, setLoginErrors] = useState({});
    const [loginData, setLoginData] = useState({ collegeEmail: '', password: '' });
    const navigate = useNavigate(); // Use useHistory to programmatically navigate

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validateLogin = () => {
        const errors = {};
        if (!loginData.collegeEmail) errors.collegeEmail = 'Email is required';
        if (!loginData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const errors = validateLogin();
        if (Object.keys(errors).length > 0) {
            setLoginErrors(errors);
            return;
        }
        setLoginErrors({});
        try {
            const response = await instituteLogin(loginData);
            if (response.ok) {
                const result = await response.json();
                const college = result.college;
                cookies.set('instituteData',
                    JSON.stringify(college), { path: '/' })

                navigate('/institute'); // Redirect to admin layout

            } else if (response.status === 401) {
                // Unauthorized
                setLoginErrors({ server: 'Wrong credentials. Please try again.' });
            } else {
                const errorData = await response.json();
                setLoginErrors({ server: errorData.message });
            }
        } catch (err) {
            setLoginErrors({ server: `An error occurred. Please try again. ${err}` });
        }
    };

    const handleCreateAccount = () => {
        navigate('/guestLayout/instituteRegistration');
    };

    return (
        <div >
            <Container className='container-2'>

                <div className="form form-1">
                    <h2 className='pb-4'>Institute Login</h2>
                    {loginErrors.server && <Alert variant="danger">{loginErrors.server}</Alert>}
                    <Form onSubmit={handleLoginSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="collegeEmail"
                                name="collegeEmail"
                                placeholder="Email address"
                                className={`mb-3 ${loginErrors.collegeEmail ? 'is-invalid' : ''}`}
                                value={loginData.collegeEmail}
                                onChange={handleLoginChange}
                            />
                            {loginErrors.collegeEmail && <p className="invalid-feedback">{loginErrors.collegeEmail}</p>}
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={`mb-3 ${loginErrors.password ? 'is-invalid' : ''}`}
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                            {loginErrors.password && <p className="invalid-feedback">{loginErrors.password}</p>}
                        </Form.Group>
                        <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                            Log In
                        </Button>
                        <Link to="/instituteForgotPassword" className="forgot-password d-block mb-3">
                            Forgotten password?
                        </Link>
                        <hr />
                        <Button variant="success" className="signup-button-3" onClick={handleCreateAccount}>
                            Create New Account
                        </Button>
                    </Form>
                </div>

            </Container>
        </div>
    );
}

export default InstituteLogin
