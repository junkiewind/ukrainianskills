const express = require('express')
const app = express()
app.set("view enjine", "ejs")
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/about', (req, res) => {
//     res.send(' <h1>Про цей проект</h1> ')
// })



app.get('/', (req, res) => {
    res.render("index.ejs")
    // res.send(Date())
})

app.use(express.static("public"))

const port = 8080
app.listen(port, () => {
    console.log(`Experss in running on port  ${port}`)
})

