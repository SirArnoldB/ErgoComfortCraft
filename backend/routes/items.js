import express from 'express'
import itemsController from '../controllers/items.js'

// create a router specifically for the items path
const router = express.Router()

// Get all items
router.get('/', itemsController.getAllItems)

// Get a single item
router.get('/:id', itemsController.getItem)


export default router   