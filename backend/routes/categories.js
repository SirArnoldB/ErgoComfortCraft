import express from 'express'
import categoriesController from '../controllers/categories.js'

// create a router specifically for the categories path
const router = express.Router()

// Get all categories
router.get('/', categoriesController.getAllCategories)

// Get a single category
router.get('/:id', categoriesController.getCategory)

// Get all categories and their items
router.get('/items/cat_items', categoriesController.getAllCategoriesAndItems)


export default router