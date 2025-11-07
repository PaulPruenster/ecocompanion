/**
 * User Entity
 * Represents a user in the system
 */
export interface User {
  id: number;
  name: string;
}

/**
 * User creation DTO (Data Transfer Object)
 * Used when creating a new user (without ID)
 */
export interface CreateUserDto {
  name: string;
}
