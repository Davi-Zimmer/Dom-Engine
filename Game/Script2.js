export default function( GameScript ){

    GameScript.Create('Hello', () => {

        function sayHello(){
            console.log('Hello, World!')
        }

        GameScript.Export({ sayHello })

    })

}