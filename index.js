const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({
    message: "Method get berhasil",
  })
})

const db = require("./app/models/")
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log(`Database telah terkoneksi`)
  })
  .catch((err) => {
    console.log(`wah, tidak bisa terkoneksi!`, err)
    process.exit()
  })

require("./app/routes/post.routes")(app)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`)
})
