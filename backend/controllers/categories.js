import { pool } from "../config/database.js";

// Get all categories.
const getAllCategories = async (_, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM categories`
        )
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a single category.
const getCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query(
            `SELECT * FROM categories WHERE category_id = $1`, [id]
        )
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get all categories and their items.
const getAllCategoriesAndItems = async (_, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT
                categories.category_name,
                json_agg(
                    json_build_object(
                        'item_id', items.item_id,
                        'item_name', items.item_name,
                        'item_description', items.item_description,
                        'item_price', items.item_price,
                        'item_image', items.item_image
                    )
                ) AS items
            FROM categories
            INNER JOIN items ON categories.category_id = items.category_id
            GROUP BY categories.category_name`
        )
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export default { getAllCategories, getCategory, getAllCategoriesAndItems }
