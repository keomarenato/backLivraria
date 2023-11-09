import express from 'express'
import connectaNaDatabase from './config/dbConnect.js'
import routes from './routes/index.js'

const conexao = await connectaNaDatabase()

conexao.on("error", (erro) => {
  console.error('erro de conexao', erro)
})

conexao.once("open", () => {
  console.log("Conexao feita com sucesso")
})

const app = express()
routes(app)

export default app