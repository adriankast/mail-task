const mongoose = require("mongoose")
const express = require("express")
const config = require("./config.js")

startServer()

/** async function to startup mongoDB connection */
async function startServer() {

    // MongoDB Setup
    await mongoose.connect(config.dbPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    const Schema = mongoose.Schema

    const ToDoScheme = new Schema({
        title: String,
        body: String
    })

    const ToDo = mongoose.model("ToDo", ToDoScheme)

    const firstTodo = new ToDo({title: "second", body: "htmlhtmlhtml"})


    // Server setup
    const server = express()

    server.use(express.json())
    server.use((req, res, next) => {
        if (config.allowHosts.some( allowName => (allowName === req.headers.origin))) {
            res.header("Access-Control-Allow-Origin", req.headers.origin)
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        }

        next()
    })

    server.get("/todos/:id", function (req, res) {
        console.log("read: ", req.params.id)
        ToDo.findById(req.params.id, (err, doc) => {
            if (err) {
                console.error(err)
                res.statusCode = 400
                res.send()
            }
            else {
                res.send(doc)
            }
        })
    })

    // go live
    server.listen(config.serverPort, () => {
        console.log("Server started on Port ", config.serverPort)
        console.log("http://localhost:" + config.serverPort)
    })
}
