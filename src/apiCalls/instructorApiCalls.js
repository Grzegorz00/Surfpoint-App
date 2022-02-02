import { getCurrentUser } from "../helpers/authHelper";

const instructorsBaseUrl = 'http://localhost:3000/api/instructors'

export function getInstructorApiCall() {
    const promise = fetch(instructorsBaseUrl)
    return promise;
}

export function getInstructorByIdApiCall(instructorId){
    const url = `${instructorsBaseUrl}/${instructorId}`;
    const promise = fetch(url);
    return promise;
}

export function addInstructorApiCall(instructor) {
    const instructorString = JSON.stringify(instructor)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: instructorString
    }

    const promise = fetch(instructorsBaseUrl, options);
    return promise;
}

export function updateInstructorApiCall(instructorId, instructor) {
    const user = getCurrentUser()
    const url = `${instructorsBaseUrl}/${instructorId}`
    const instructorString = JSON.stringify(instructor)

    let token
    if(user && user.token) {
        token = user.token
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: instructorString
    }

    const promise = fetch(url, options);
    return promise;
}

export function deleteInstructorApiCall(instructorId) {
    const user = getCurrentUser()
    const url = `${instructorsBaseUrl}/${instructorId}`

    let token
    if(user && user.token) {
        token = user.token
    }

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    const promise = fetch(url, options);
    return promise;
}