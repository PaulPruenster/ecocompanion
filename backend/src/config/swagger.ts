import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoCompanion API',
      version: '1.0.0',
      description: 'API documentation for EcoCompanion backend',
      contact: {
        name: 'API Support',
        email: 'support@ecocompanion.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {
              type: 'integer',
              description: 'The auto-generated id of the user',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'The name of the user',
              example: 'John Doe',
            },
          },
        },
        CreateUserDto: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              description: 'The name of the user',
              example: 'John Doe',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Failed to retrieve users',
            },
            message: {
              type: 'string',
              description: 'Detailed error message',
              example: 'Database connection failed',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Path to files with annotations
};

export const swaggerSpec = swaggerJsdoc(options);
