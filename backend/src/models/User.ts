/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: John Doe
 */
export interface User {
  id: number;
  name: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *           example: John Doe
 */
export interface CreateUserDto {
  name: string;
}
