import express from 'express'
import categoriesController from '../controllers/categories.js'

// create a router specifically for the categories path
const router = express.Router()

// Get all categories
router.get('/', categoriesController.getAllCategories)

// Get a single category
router.get('/:id', categoriesController.getCategory)


export default router