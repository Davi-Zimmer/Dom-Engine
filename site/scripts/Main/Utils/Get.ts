function Get( url: string ){
    return fetch(  location.href + url, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.text())
}

export default Get