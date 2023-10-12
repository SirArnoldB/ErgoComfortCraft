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


export default { getAllCategories, getCategory }
