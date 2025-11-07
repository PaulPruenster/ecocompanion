import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUserDto } from '../models/User';

/**
 * UserController
 * Similar to a C# Controller - handles HTTP requests and responses
 */
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * GET /api/users
   * Get all users
   */
  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve users',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * GET /api/users/:id
   * Get user by ID
   */
  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await this.userService.getUserById(id);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({ 
        error: 'Failed to retrieve user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * POST /api/users
   * Create a new user
   */
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      if (!userData.name || userData.name.trim() === '') {
        res.status(400).json({ error: 'Name is required' });
        return;
      }

      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in createUser:', error);
      res.status(500).json({ 
        error: 'Failed to create user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * PUT /api/users/:id
   * Update an existing user
   */
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const userData: CreateUserDto = req.body;

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      if (!userData.name || userData.name.trim() === '') {
        res.status(400).json({ error: 'Name is required' });
        return;
      }

      const updatedUser = await this.userService.updateUser(id, userData);

      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error in updateUser:', error);
      res.status(500).json({ 
        error: 'Failed to update user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  /**
   * DELETE /api/users/:id
   * Delete a user
   */
  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({ 
        error: 'Failed to delete user',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}
