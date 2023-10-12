import express from 'express'
import workspacesRouter from './routes/workspaces.js'
import categoriesRouter from './routes/categories.js'
import itemsRouter from './routes/items.js'
import cors from 'cors'

// create an express app
const app = express()

// enable cross-origin resource sharing
app.use(cors())

// enable json request body parsing
app.use(express.json())

// workspaces api 
app.use('/workspaces', workspacesRouter)

// categories api
app.use('/categories', categoriesRouter)

// items api
app.use('/items', itemsRouter)

// set up the default route
app.get('/', (req, res) => {
    res.status(200).send(
        `<h1 style="text-align: center; margin-top: 20px;">Welcome to the WorkSpaces API!</h1>`
    )
})

// set up the port to listen on
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})