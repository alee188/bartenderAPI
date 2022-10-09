// setup
const express = require("express")
const mongoose = require("mongoose")

const app = express()

//Middleware
app.use(express.json())
app.use ((req, res, next) => {
    console.log(req.path)
    console.log(req.ip)
    console.log(new Date())
    next()
})

// Routes
app.use(require("./routes/bartender.js"))
app.use(require("./routes/mongoose.js"). router)
app.get("/error", (req, res,next) =>{
    next(new Error("Custom Error"))
})

// Error handling
app.use((err,req,res,next) =>{
    console.log(err)
    next(err)
})

app.use((err, req, res, next) => {
    res.status(500).send(err.stack)
    next(err)
})

// start
mongoose.connect("mongodb://127.0.0.1:27017")

const server = app.listen(3001, () => {
    console.log(server.address())
})