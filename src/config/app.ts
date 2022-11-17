import express from 'express';
import routes from '../router/router';
import cookieParser from 'cookie-parser';

export class App {
    private app : express.Application;

    constructor()
    {
        this.app = express()
        this.middleware()
        this.routes()
    }

    private middleware()
    {
        this.app.use(cookieParser())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    private routes()
    {
        this.app.use('/api', routes)
    }

    public listen(port: number)
    {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    }
}