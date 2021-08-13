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
