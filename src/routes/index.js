import expres from "express"
import livros from './livrosRoutes.js'
import autores from './autoresRoutes.js'

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de NodeJs"))
  app.use(expres.json(), livros, autores)
}

export default routes