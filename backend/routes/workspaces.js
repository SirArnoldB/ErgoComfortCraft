import express from 'express'
import workspacesController from '../controllers/workspaces.js'

// create a router specifically for the workspaces path
const router = express.Router()

// Get all workspaces 
router.get('/', workspacesController.getAllWorkspaces)

// Get a single workspace
router.get('/:id', workspacesController.getWorkSpace)

// Create a workspace
router.post('/', workspacesController.createWorkspace)

// Update a workspace
router.put('/:id', workspacesController.updateWorkspace)

// Delete a workspace
router.delete('/:id', workspacesController.deleteWorkspace)

export default router


