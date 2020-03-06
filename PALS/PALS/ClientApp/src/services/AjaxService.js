export async function getData(url = '', params = {}) {

    if (params) { url += "?" + convertObjectToParams(params); }

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client            
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function convertObjectToParams(input) {

    var output = [];
    Object.keys(input).forEach(function (key) {
        output.push(key + "=" + input[key]);
    });
    return output.join("&");

}