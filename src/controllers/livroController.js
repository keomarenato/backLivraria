import livro from '../models/Livros.js'
import { autor } from '../models/Autor.js'

class LivroControler {

  static async listarLivros(req, res) {
    try {
      const listaLivros = await livro.find({})
      res.status(200).json(listaLivros)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição` })
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id
      const livroEncontrado = await livro.findById(id)
      res.status(200).json(livroEncontrado)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao encontrar um livro` })
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor)
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }
      const livroCriado = await livro.create(livroCompleto)
      res.status(201).json({ message: "Criado com sucesso", livro: novoLivro })
    } catch (error) {
      res.status(500).json({ message: `${error.message}- falha ao cadastrar livro` })
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: "Livro atualizado" })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualização` })
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndDelete(id)
      res.status(200).json({ message: "Livro excluido com sucesso" })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na exclusão` })
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora
    try {
      const livrosPorEdiotra = await livro.find({ editora: editora })
      res.status(200).json(livrosPorEdiotra)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` })
    }
  }

}

export default LivroControler