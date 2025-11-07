import { Router } from 'express';
import { UserController } from '../controllers/UserController';

/**
 * User Routes
 * Defines all routes for user-related endpoints
 */
const router = Router();
const userController = new UserController();

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById);

// POST /api/users - Create a new user
router.post('/', userController.createUser);

// PUT /api/users/:id - Update a user
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Delete a user
router.delete('/:id', userController.deleteUser);

export default router;
