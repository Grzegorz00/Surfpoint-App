const coursesBaseUrl = 'http://localhost:3000/api/courses'

export function getCourseApiCall() {
    const promise = fetch(coursesBaseUrl)
    return promise;
}

export function getCourseByIdApiCall(courseId){
    const url = `${coursesBaseUrl}/${courseId}`;
    const promise = fetch(url);
    return promise;
}

export function addCourseApiCall(course) {
    const courseString = JSON.stringify(course)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: courseString
    }

    const promise = fetch(coursesBaseUrl, options);
    return promise;
}

export function updateCourseApiCall(courseId, course) {
    const url = `${coursesBaseUrl}/${courseId}`
    const courseString = JSON.stringify(course)

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: courseString
    }

    const promise = fetch(url, options);
    return promise;
}