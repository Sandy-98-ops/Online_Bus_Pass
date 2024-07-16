import React, { useState } from 'react'
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { instituteForgotPassword, studentForgotPassword } from '../../utils/api';

const InstituteForgotPassword = () => {
    const [loginErrors, setLoginErrors] = useState({});
    const [loginData, setLoginData] = useState({ collegeEmail: '' });
    const navigate = useNavigate(); // Use useHistory to programmatically navigate

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validateLogin = () => {
        const errors = {};
        if (!loginData.collegeEmail) errors.collegeEmail = 'Email is required';
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
            const response = await instituteForgotPassword(loginData.collegeEmail);
            if (response.ok) {
                alert("Password sent to mail")
                navigate('/guestLayout/instituteLogin'); // Redirect to admin layout

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
                    <h2 className='pb-4'>Forgot Password</h2>
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
                       
                        <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                            Submit
                        </Button>
                        <Link to="/guestLayout/instituteLogin" className="forgot-password d-block mb-3">
                           Login
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

export default InstituteForgotPassword
