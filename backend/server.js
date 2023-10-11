import express from 'express'
import dotenv from 'dotenv'

// import the router from your routes file


dotenv.config()

const app = express()

app.use(express.json())


// specify the api path for the server to use


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})