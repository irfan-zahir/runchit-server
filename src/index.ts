import express from "express"
import routes from "./routes"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => res.send("Welcome to Runchit api"))

app.listen(3003, () => {
    routes(app)
})