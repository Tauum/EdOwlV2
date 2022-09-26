import Axios from "./Axios";

export const baseGetRequest = async (endpoint) => {
    var result = ""
    var errorMsg = {};
    try {
        const get_response = await Axios.get(`${window.ipAddress.ip}/${endpoint}`);
        if (get_response.data !== null && get_response.status === 200) {
            result = get_response.data;
        }
        else {
            // handle error here
        }
    }
    catch (err) {
        if (!err?.response) { errorMsg = 'No Server Response' }
        else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        else { errorMsg = 'Login Failed' }
        console.log("error", err)
    }
    return (result);
}
export const redirectGetRequest = async (navigate, endpoint) => {

    var result = ""
    var errorMsg = {};
    try {
        const get_response = await Axios.get(`${window.ipAddress.ip}/${endpoint}`);
        if (get_response.data !== null && get_response.status === 200) {
            result = get_response.data;
        }
        else {
            // handle error here
        }
    }
    catch (err) {
        if (!err?.response) { errorMsg = 'No Server Response' }
        else if (err.response?.status === 404) { navigate('*') }
        else { errorMsg = 'Login Failed' }
        console.log("error", err)
    }
    return (result);
}
export const baseDeleteRequest = async (endpoint) => {
    var result = ""
    var errorMsg = {};
    try {
        const get_response = await Axios.delete(`${window.ipAddress.ip}/${endpoint}`);
        if (get_response.status === 200) {
            result = get_response.data;
        }
        else {
            // handle error here
        }
    }
    catch (err) {
        if (!err?.response) { errorMsg = 'No Server Response' }
        else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        else { errorMsg = 'Login Failed' }
    }
    return (result);
}
export const postLogoutRequest = async () => { // finish this
    try {
        await Axios.post(`${window.ipAddress.ip}/Auth/signout`);
        return;
    }
    catch (err) {
        console.log(err)
        return;
    }
}

export const postRegisterRequestWithoutCredentails = async (object) => { // finish this
    try {
        const createdOn = new Date();
        const post_request = await Axios.post(`${window.ipAddress.ip}/Auth/signup`,

            JSON.stringify({
                email: object.email.toLowerCase(), password: object.password, dob: object.dob,
                termsAndConditions: object.termsAndConditions, createdOn: createdOn
            }),
            { withCredentials: false, headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 200) { return 0; }
        else { return 1; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 2; } // No Server Respons
        else if (err.response?.status === 400) { return 3; } //Email Taken
        else { return 2; }// Registration Failed
    }
}
export const postLoginRequest = async (object) => { // finish this
    try {
        const post_request = await Axios.post(`${window.ipAddress.ip}/Auth/signin`,
            JSON.stringify({ email: object.email.toLowerCase(), password: object.password }),
            { headers: { 'Content-Type': 'application/json' } });

        if (post_request.data !== null && post_request.status === 200) { return post_request.data }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; } //No Server Response
        else if (err.response?.status === 401) { return 'Incorrect Credentials'; } // Incorrect Credentials
        else if (err.response?.status === 403) { return 'Account Disabled'; } // Account Disabled
        else if (err.response?.status === 418) { return 'Unknown Error'; } //Unknown Error
        else { return 'No Server Response'; } // Login Failed
    }
}
export const putInitialRegisterRequest = async (endpoint, object) => { // finish this
    try {
        const post_request = await Axios.put(`${window.ipAddress.ip}/${endpoint}`,
            JSON.stringify({
                firstName: object.firstName, lastName: object.lastName, modulesSelected: object.modules,
                student: object.student, userInstitutionId: object.userInstitutionId,
                avatar: object.avatar, initialRegister: object.initialRegister
            }), { withCredentials: false, headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 200) { return 0; }
        else {
            return "Couldnt complete initial sign up in backend";
        }
    }
    catch (err) {
        console.log(err)
        return "Couldnt complete initial sign up in backend";
    }
}

export const postQuickNote = async (object) => { // finish this request
    try {

        const post_request = await Axios.post(`${window.ipAddress.ip}/QuickNotes/add/`,
            JSON.stringify({ content: object.content, userId: object.userId })
            , { headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 201) { return 201 }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        console.log(err)
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        return;
    }
}

export const contactUsPostRequestWithoutCredentails = async (endpoint, object) => { // finish this request
    try {
        var todayDate = new Date().toISOString().slice(0, 10);
        const post_request = await Axios.post(`${window.ipAddress.ip}/${endpoint}`,
            JSON.stringify({
                name: object.name, email: object.email,
                message: object.message, generatedDate: todayDate
            }),
            { withCredentials: false, headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 201) { return post_request.data; }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        console.log(err)
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        return;
    }
}

export const putExtraViewRequest = async (endpoint) => { // finish this
    try {
        const put_request = await Axios.put(`${window.ipAddress.ip}/${endpoint}`);

        if (put_request.status === 201) { return put_request.data; }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        console.log(err)
        return;
    }
}

export const putRatingRequest = async (endpoint) => { // finish this
    try {
        const post_request = await Axios.patch(`${window.ipAddress.ip}/${endpoint}`);

        if (post_request.status === 201) { return post_request.data; }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        console.log(err)
        return;
    }
}
export const postSubmittedPropagateRequest = async (object) => { // finish this
    try {
        const post_request = await Axios.post(`${window.ipAddress.ip}/SubmittedPropagates/add`,
            JSON.stringify({
                propagate: object.propagate, user: object.user, score: object.score,
                generatedDate: object.generatedDate, timeTaken: object.timeTaken,
                rating: object.rating, submittedPropagateAttempts: object.submittedPropagateAttempts
            }),
            { headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 201) { return post_request.data; }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        console.log(err)
        return;
    }
}
export const postSubmittedQuizRequest = async (object) => { // finish this
    try {
        const post_request = await Axios.post(`${window.ipAddress.ip}/SubmittedQuiz/add`,
            JSON.stringify({

            }),
            { headers: { 'Content-Type': 'application/json' } });

        if (post_request.status === 201) { return post_request.data; }
        else {
            // handle error here
            return;
        }
    }
    catch (err) {
        // if (!err?.response) { errorMsg = 'No Server Response' }
        // else if (err.response?.status === 401) { errorMsg = 'Incorrect Credentials' }
        // else if (err.response?.status === 403) { errorMsg = 'Account Disabled' }
        // else if (err.response?.status === 418) { errorMsg = 'Unknown Error' }
        // else { errorMsg = 'Login Failed' }
        console.log(err)
        return;
    }
}


export const postExtra = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.post(`${window.ipAddress.ip}/Extras/add`,
            JSON.stringify({
                title: object.title, author: object.author,
                summary: object.summary, content: object.content,
                video: object.video, hidden: object.hidden, generatedDate: createdOn
            }),
            { headers: { 'Content-Type': 'application/json' } });
        if (submit_response.status === 201) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
} 
export const updateExtra = async (object) => {
    try {
        var submit_response = await Axios.put(`${window.ipAddress.ip}/Extras/update/`,
            JSON.stringify({
                id: object.id, title: object.title, author: object.author,
                summary: object.summary, content: object.content, video: object.video,
                hidden: object.hidden, generatedDate: object.generatedDate
            }),
            { headers: { 'Content-Type': 'application/json' } });

        if (submit_response.status === 200) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
}

export const postPropagate = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.post(`${window.ipAddress.ip}/Propagates/add`,
            JSON.stringify({
                title: object.title, answer: object.answer, lives: object.lives,
                    value: object.value, subject: object.subject, endContent: object.endContent, 
                    description: object.description, hidden: object.hidden, generatedDate: createdOn
            }),
            { headers: { 'Content-Type': 'application/json' } });
        if (submit_response.status === 201) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
} 
export const updatePropagate = async (object) => {
    try {
        var submit_response = await Axios.put(`${window.ipAddress.ip}/Propagates/update/`,
            JSON.stringify({
                id: object.id, title: object.title, answer: object.answer, lives: object.lives,
                value: object.value, subject: object.subject, endContent: object.endContent, 
                description: object.description, hidden: object.hidden, generatedDate: object.generatedDate
            }),
            { headers: { 'Content-Type': 'application/json' } });

        if (submit_response.status === 200) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
}

export const postUpdate = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.post(`${window.ipAddress.ip}/Updates/add`,
            JSON.stringify({
                id:object.id, content: object.content, generatedDate: createdOn
            }),
            { headers: { 'Content-Type': 'application/json' } });
        if (submit_response.status === 201) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
} 
export const updateUpdate = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.put(`${window.ipAddress.ip}/Updates/update/`,
            JSON.stringify({ id: object.id, content: object.content, generatedDate: createdOn }),
            { headers: { 'Content-Type': 'application/json' } });

        if (submit_response.status === 200) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
}

export const postQuiz = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.post(`${window.ipAddress.ip}/Quizzes/add`,
            JSON.stringify({
                title: object.title, timeLimit: object.timeLimit, 
                subject: object.subject, description: object.description, endContent: object.endContent, 
                value: object.value, hidden: object.hidden, questions: object.questions, generatedDate: createdOn
            }),
            { headers: { 'Content-Type': 'application/json' } });
        if (submit_response.status === 201) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
} 
export const updateQuiz = async (object) => {
    try {
        const createdOn = new Date().toISOString().slice(0, 10);
        var submit_response = await Axios.put(`${window.ipAddress.ip}/Quizzes/update/`,
            JSON.stringify({ id: object.id, title: object.title, timeLimit: object.timeLimit,
                subject: object.subject, description: object.description, endContent: object.endContent, 
                value: object.value, hidden: object.hidden, questions: object.questions, generatedDate: createdOn }),
            { headers: { 'Content-Type': 'application/json' } });

        if (submit_response.status === 200) { return submit_response.status; }
        else { return 'No Server Response'; }
    }
    catch (err) {
        console.log(err)
        if (!err?.response) { return 'No Server Response'; }
        else if (err.response?.status === 400) { return 'Bad Request'; }
        else { return 'Unknown error'; }
    }
}
