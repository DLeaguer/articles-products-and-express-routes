const express = require('express')
const app = express()


// const PORT = process.env.PORT || 5000

// app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/css/styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/styles.css')
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html')
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`)})

// app.listen(PORT, () => {
//   console.log(`Server started on port: ${}`)
// })
