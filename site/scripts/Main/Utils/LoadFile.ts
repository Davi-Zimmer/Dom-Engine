function loadImage( src: string ){
    const image = new Image()
    image.src = src 

    return image
}

function loadAudio( src:string ){
    return new Audio( src )
}

function loadFile( src: string ) : HTMLImageElement | HTMLAudioElement | undefined {

    const splitted = src.split('.')

    const extension = splitted[ splitted.length -1 ]

    const path = window.location.href + src

    switch( extension ){

        case 'jpg'  : return loadImage( path )
        case 'png'  : return loadImage( path )
        case 'jpeg' : return loadImage( path )
        case 'mp3'  : return loadAudio( path )
        case 'wav'  : return loadAudio( path )
        case 'ogg'  : return loadAudio( path )

        default : return undefined

    }

}


export default loadFile