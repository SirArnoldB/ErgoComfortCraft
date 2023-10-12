import { pool } from "../config/database.js";

// Get all items.
const getAllItems = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM items`
        )
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a single item.
const getItem = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query(
            `SELECT * FROM items WHERE item_id = $1`, [id]
        )
        res.status(200).json(rows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export default { getAllItems, getItem }