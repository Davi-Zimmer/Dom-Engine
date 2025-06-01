function Post( url: string ){

    const path = window.location.href + url
    return fetch( path , {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.text())
}

export default Post