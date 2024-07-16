const API_URL = 'http://localhost:7000';

const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${API_URL}${endpoint}`;
    const options = { method };

    if (data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) {
            options.headers = { 'Content-Type': 'application/json' };
        }
    }

    try {
        const response = await fetch(url, options);
        return response;
    } catch (error) {
        throw new Error(`An error occurred while processing your request : ${error}`);
    }
};


export const studentRegister = (signupData) => {
    return apiRequest('/student/createStudent', 'POST',
        signupData);
};

export const updateStudent = (id, signupData) => {
    return apiRequest(`/student/updateById/${id}`, 'PUT', signupData);
}

export const studentForgotPassword = (email) => {
    return apiRequest(`/student/forgotPassword/${email}`, 'PUT');
}

export const instituteForgotPassword = (collegeEmail) => {
    return apiRequest(`/institute/forgotPassword/${collegeEmail}`, 'PUT');
}

export const updateInstituteDetails = (id, signupData) => {
    return apiRequest(`/institute/updateById/${id}`, 'PUT', signupData);
}

export const instituteRegister = (signupData) => {
    return apiRequest('/institute/createInstitute', 'POST',
        signupData);
};

export const studentLogin = (loginData) => {
    return apiRequest('/student/login', 'POST', loginData);
};

export const instituteLogin = (loginData) => {
    return apiRequest('/institute/instituteLogin', 'POST', loginData)
}

export const depoLogin = (loginData) => {
    return apiRequest('/depo/login', 'POST', loginData)
}

export const getAllDepos = () => {
    return apiRequest('/depo/', 'GET');
}

export const getAllInstitutes = () => {
    return apiRequest('/institute/', 'GET');
}

export const getInstituteById = (id) => {
    return apiRequest(`/institute/${id}`, 'GET');
}

export const rejectInstitute = (id) => {
    return apiRequest(`/institute/rejectInstitute/${id}`, 'PUT');
}

export const approveInstitute = (id) => {
    return apiRequest(`/institute/approveInstitute/${id}`, 'PUT');
}

export const studentPassApplication = (applicationData) => {
    return apiRequest('/pass-applications/upload', 'POST', applicationData);
}

export const getInstitutePassApplications = (id) => {
    return apiRequest(`/pass-applications/getInstitutePassApplications/${id}`, 'GET');
}

export const getPassApplications = () => {
    return apiRequest(`/pass-applications/`, 'GET');
}


export const approveApplication = (id) => {
    return apiRequest(`/pass-applications/instituteApproval/${id}`, 'PUT');
}

export const rejectApplication = (id) => {
    return apiRequest(`/pass-applications/instituteRejection/${id}`, 'PUT')
}

export const approveDepoApplication = (id) => {
    return apiRequest(`/pass-applications/depoApproval/${id}`, 'PUT');

}

export const rejectDepoApplication = (id) => {
    return apiRequest(`/pass-applications/depoRejection/${id}`, 'PUT');
}