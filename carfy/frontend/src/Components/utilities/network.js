const getCookie=(name)=> {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

async function fetchShopServiceById(id){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({shop_id:12})
    };
    const response = await fetch(`http://127.0.0.1:9000/api/shop-service/${id}`, requestOptions);

    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const service = await response.json();
    return service;
}



async function saveServiceRequestToDb(request){
    const csrftoken = getCookie('csrftoken')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        body: JSON.stringify(request)
    };
    const response = await fetch(`http://127.0.0.1:9000/api/service-request/`, requestOptions);

    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const responseMessage = await response.json();
    return responseMessage;
}

// customer/requests
async function getUserServiceRequests(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify(request)
    };
    const response = await fetch(`http://127.0.0.1:9000/api/customer/requests/`, requestOptions);

    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const res = await response.json();
    return res;
}
async function updateServiceRequests(services, status){    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        body: JSON.stringify({ids:services, status:status})
    };
    const response = await fetch(`http://127.0.0.1:9000/api/service-request/update/`, requestOptions);

    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }
    const res = await response.json();
    return res;
}

//generic data fetching function
async function fetchData(endpoint){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        // body: JSON.stringify(request)
    };
    const response = await fetch(`http://127.0.0.1:9000/api${endpoint}`, requestOptions);
    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const res = await response.json();
    return res;
}

//generic data updating/deleting function
async function updateDeleteData(endpoint, method="DELETE"){
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
        // body: JSON.stringify(request)
    };
    const response = await fetch(`http://127.0.0.1:9000/api${endpoint}`, requestOptions);
    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const res = await response.json();
    return res;
}

async function retrieveUserData(){
    console.log('retrieving data');
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
    };
    const response = await fetch('http://127.0.0.1:9000/api/check_auth', requestOptions)
    if (!response.ok){
        throw new Error("HTTP status " + response.status);
    }

    const res = await response.json();
    return res;
}


export {fetchShopServiceById, saveServiceRequestToDb,
     getCookie,getUserServiceRequests,
     fetchData, updateServiceRequests, updateDeleteData, retrieveUserData}