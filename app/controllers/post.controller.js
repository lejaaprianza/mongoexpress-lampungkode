const db = require("../models")

const Post = db.posts

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error saat mengambil data post",
      })
    })
}

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  })

  post
    .save(post)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Error saat membuat data post",
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Post.findById(id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Error terjadi ketika mengambil data",
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post tidak ditemukan",
        })
      }
      res.send({
        message: "Post telah diupdate",
      })
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "eror ketika meng-update data",
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post tidak ada",
        })
      }
      res.send({
        message: "Post telah dihapus",
      })
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "eror ketika menghapus data",
      })
    })
}
