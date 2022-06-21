const express = require('express')
const app = express()


app.get('/', (req, res)=>{
    res.status(200).send("<h1>Hello World</h1>")

})

app.get('/about', (req, res)=>{
    res.cookie('username','Ivan')
    res.send("<h1>About</h1>")

})

app.use((req,res)=>{
    res.status(401).send("Page Not Found")

})

module.exports = app