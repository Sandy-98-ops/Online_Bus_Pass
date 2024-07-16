import { useState } from 'react';
import Cookies from 'js-cookie';

const studentData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    institute: ''
};

export const useStudentData = () => {
    const [student, setStudent] = useState(() => {
        const studData = Cookies.get('studentData');
        if (studData) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(studData);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return studentData; // Fallback to default if parsing fails
            }
        }
        return studentData; // Return default if cookie doesn't exist
    });

    const updateUserData = (newUserData) => {
        setStudent(newUserData);
        Cookies.set('studentData', JSON.stringify(newUserData));
    };

    return { student, updateUserData };
};


const instituteData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    institute: ''
};

export const useInstituteData = () => {
    const [institute, setInstitute] = useState(() => {
        const data = Cookies.get('instituteData');
        if (data) {
            try {
                console.log("Got Cookie and returning back")
                return JSON.parse(data);
            } catch (error) {
                console.error('Error parsing studentData cookie:', error);
                return instituteData; // Fallback to default if parsing fails
            }
        }
        return instituteData; // Return default if cookie doesn't exist
    });

    const updateInstituteData = (newUserData) => {
        setInstitute(newUserData);
        Cookies.set('instituteData', JSON.stringify(newUserData));
    };

    return { institute, updateInstituteData };
};
