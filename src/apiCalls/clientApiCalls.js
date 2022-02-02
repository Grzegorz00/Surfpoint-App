const clientsBaseUrl = 'http://localhost:3000/api/clients'

export function getClientApiCall() {
    const promise = fetch(clientsBaseUrl)
    return promise;
}

export function getClientByIdApiCall(clientId){
    const url = `${clientsBaseUrl}/${clientId}`;
    const promise = fetch(url);
    return promise;
}

export function addClientApiCall(client) {
    const clientString = JSON.stringify(client)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: clientString
    }

    const promise = fetch(clientsBaseUrl, options);
    return promise;
}

export function updateClientApiCall(clientId, client) {
    const url = `${clientsBaseUrl}/${clientId}`
    const clientString = JSON.stringify(client)

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: clientString
    }

    const promise = fetch(url, options);
    return promise;
}