import { pool } from "../config/database.js";

// Get all workspaces along with their items, total price, and total items. 
const getAllWorkspaces = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT workspaces.workspace_id, workspaces.workspace_name, workspaces.workspace_description, workspaces.workspace_price, workspaces.workspace_image, 
            json_agg(json_build_object('item_id', items.item_id, 'item_name', items.item_name, 'item_description', items.item_description, 'item_price', items.item_price)) AS items, 
            SUM(items.item_price) AS total_price, 
            COUNT(items.item_id) AS total_items 
            FROM workspaces 
            JOIN workspace_items ON workspaces.workspace_id = workspace_items.workspace_id 
            JOIN items ON workspace_items.item_id = items.item_id 
            GROUP BY workspaces.workspace_id`
        )
        res.status(200).json(rows)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Get a single workspace along with its items, total price, and total items.
const getWorkSpace = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = await pool.query(
            `SELECT workspaces.workspace_id, workspaces.workspace_name, workspaces.workspace_description, workspaces.workspace_price, workspaces.workspace_image, 
            json_agg(json_build_object('item_id', items.item_id, 'item_name', items.item_name, 'item_description', items.item_description, 'item_price', items.item_price, 'item_image', items.item_image)) AS items,
            SUM(items.item_price) AS total_price, 
            COUNT(items.item_id) AS total_items 
            FROM workspaces 
            JOIN workspace_items ON workspaces.workspace_id = workspace_items.workspace_id 
            JOIN items ON workspace_items.item_id = items.item_id 
            WHERE workspaces.workspace_id = $1 
            GROUP BY workspaces.workspace_id`, [id]
        )
        res.status(200).json(rows[0])
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// Create a workspace. The request body should contain workspace information, as well as an array of item ids.
const createWorkspace = async (req, res) => {
    try {
        const { workspace_name, workspace_description, workspace_price, workspace_image, items } = req.body
        const { rows: workspaceRows } = await pool.query(
            `INSERT INTO workspaces (workspace_name, workspace_description, workspace_price, workspace_image) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`, [workspace_name, workspace_description, workspace_price, workspace_image]
        )
        const workspaceId = workspaceRows[0].workspace_id
        const { rows: workspaceItemRows } = await pool.query(
            `INSERT INTO workspace_items (workspace_id, item_id) 
            SELECT $1, item_id 
            FROM items 
            WHERE item_id = ANY($2::uuid[]) 
            RETURNING *`, [workspaceId, items]
        )
        res.status(201).json({ workspace: workspaceRows[0], workspace_items: workspaceItemRows })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Update a workspace. The request body should contain workspace information, as well as an array of item ids.
const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params
        const { workspace_name, workspace_description, workspace_price, workspace_image, items } = req.body

        // Delete existing items associated with the workspace
        await pool.query(
            `DELETE FROM workspace_items 
  WHERE workspace_id = $1`, [id]
        )

        const { rows: workspaceRows } = await pool.query(
            `UPDATE workspaces 
            SET workspace_name = $1, workspace_description = $2, workspace_price = $3, workspace_image = $4 
            WHERE workspace_id = $5 
            RETURNING *`, [workspace_name, workspace_description, workspace_price, workspace_image, id]
        )
        const { rows: workspaceItemRows } = await pool.query(
            `INSERT INTO workspace_items (workspace_id, item_id) 
            SELECT $1, item_id 
            FROM items 
            WHERE item_id = ANY($2::uuid[]) 
            RETURNING *`, [id, items]
        )
        res.status(200).json({ workspace: workspaceRows[0], workspace_items: workspaceItemRows })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a workspace.
const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params
        const { rows: workspaceRows } = await pool.query(
            `DELETE FROM workspaces 
            WHERE workspace_id = $1 
            RETURNING *`, [id]
        )
        res.status(200).json(workspaceRows[0])
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


export default { getAllWorkspaces, getWorkSpace, createWorkspace, updateWorkspace, deleteWorkspace }
