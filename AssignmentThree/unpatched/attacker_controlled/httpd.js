const app = require('./app')
PORT = 3000

app.listen(PORT, ()=>{
    console.log('Attack Server is running at port: ', PORT)
})