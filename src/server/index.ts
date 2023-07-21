import express, { Express, Request, Response } from 'express'
import { config } from './config'
import { render } from './render'
import axios from 'axios'

const app: Express = express()

//OJO funcion necesaria para exponer el archivo js al cliente y funcione app
app.use(express.static('dist'))

app.get('/galaxias', async (req: Request, res: Response) => {
    try {
        const { data } = await axios.get("https://images-api.nasa.gov/search?q=galaxies")
        const initalProps = {
            galaxies: data?.collection?.items
        }
      
        res.send(render(req.url, initalProps))
    } catch (error) {
        throw new Error ("Error ", error)
    }
})

app.get('*', (req: Request, res: Response) => {
    res.send(render(req.url))
})

app.listen(config.PORT, ()=>{
    console.log(`Listening in PORT: ${config.PORT}`)
})