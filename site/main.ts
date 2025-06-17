import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { projectRoute } from './scripts/Main/Utils/Routes.js'
import Interpreter from './scripts/Managers/Interpreter.js'

const __filePath = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filePath )


const app = express()

const indexPage = path.join( __dirname, './pages/home.html' )
const scripts = path.join( __dirname, './scripts') 
const game = path.join( __dirname, `./${projectRoute}`) 

console.log( game )

app.use( express.json() )

app.use('/scripts', express.static( scripts ))
app.use(`/${projectRoute}`, express.static( game ))
app.use('/Transpile', ( req, res ) => {
    try {

        exec(`npm run buildGame`, ( err, stdout, stderr) => {
            /*
                if( err ) {

                    console.error( err )
                    res.sendStatus( 500 )
                }

            */

            if( stderr ){
                console.error( stderr )
                res.sendStatus( 500 )

            }

            res.sendStatus(200)
            return
        })


    } catch( ex ){
        console.log( ex )
        res.sendStatus( 500 )
    }

})


app.get( '/', ( _, res ) => res.sendFile( indexPage ) )

// app.get('/explorer', ( _ , res ) => res.sendFile(path.join( __dirname, './pages/Explorer.html' )))


const host = 'localhost'

const port = 5000

app.listen( port, host, () => {
    console.log(`http://localhost:${port}`)
})
