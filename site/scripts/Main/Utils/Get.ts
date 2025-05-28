function Get( url: string ){
    const root =  location.href.replace('Game', '')

    return fetch( root + url, {
        method: "GET",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.text())
}

export default Get