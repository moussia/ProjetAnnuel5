import 'dotenv/config'
import express from 'express'
// import db from '/conf/database'
import "./conf/database.js"

const app = express()

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})