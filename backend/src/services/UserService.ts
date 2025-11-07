import sqlite3 from 'sqlite3';
import path from 'path';
import { User, CreateUserDto } from '../models/User';

/**
 * UserService
 * Similar to a C# Service class - handles business logic and data access for Users
 */
export class UserService {
  private db: sqlite3.Database;

  constructor() {
    // Initialize SQLite database
    this.db = new sqlite3.Database(
      path.join(__dirname, '..', '..', 'database.sqlite'),
      (err) => {
        if (err) {
          console.error('Error opening database:', err);
        } else {
          console.log('Connected to SQLite database');
          this.initializeDatabase();
        }
      }
    );
  }

  /**
   * Initialize database schema
   */
  private initializeDatabase(): void {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `;

    this.db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Users table ready');
      }
    });
  }

  /**
   * Get all users
   * @returns Promise<User[]>
   */
  public async getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users', [], (err, rows: User[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * Get user by ID
   * @param id - User ID
   * @returns Promise<User | null>
   */
  public async getUserById(id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row: User) => {
        if (err) {
          reject(err);
        } else {
          resolve(row || null);
        }
      });
    });
  }

  /**
   * Create a new user
   * @param userData - User creation data
   * @returns Promise<User>
   */
  public async createUser(userData: CreateUserDto): Promise<User> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO users (name) VALUES (?)',
        [userData.name],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              name: userData.name,
            });
          }
        }
      );
    });
  }

  /**
   * Update an existing user
   * @param id - User ID
   * @param userData - Updated user data
   * @returns Promise<User | null>
   */
  public async updateUser(id: number, userData: CreateUserDto): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE users SET name = ? WHERE id = ?',
        [userData.name, id],
        async function (err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            resolve(null);
          } else {
            resolve({
              id: id,
              name: userData.name,
            });
          }
        }
      );
    });
  }

  /**
   * Delete a user
   * @param id - User ID
   * @returns Promise<boolean> - true if deleted, false if not found
   */
  public async deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0);
        }
      });
    });
  }

  /**
   * Close database connection
   */
  public close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}
