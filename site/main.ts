import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'

const __filePath = fileURLToPath( import.meta.url )
const __dirname = path.dirname( __filePath )


const app = express()

const indexPage = path.join( __dirname, './pages/home.html' )
const scirpts = path.join( __dirname, './scripts') 
const game = path.join( __dirname, '../Game')


app.use( express.json() )

app.use('/scripts', express.static( scirpts ))
app.use('/', express.static( game ))


app.get( '/Game', ( _, res ) => res.sendFile( indexPage ) )

// app.get('/explorer', ( _ , res ) => res.sendFile(path.join( __dirname, './pages/Explorer.html' )))


const host = 'localhost'

const port = 5000

app.listen( port, host, () => {
    console.log(`http://localhost:${port}`)
})
