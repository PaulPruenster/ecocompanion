import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/userRoutes';
import { swaggerSpec } from './config/swagger';

/**
 * Main application entry point
 * Configures Express server with middleware and routes
 */
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'EcoCompanion API Documentation',
}));

// Swagger JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    message: 'EcoCompanion API',
    version: '1.0.0',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      health: '/health',
      users: '/api/users',
      swagger: '/api-docs',
      swaggerJson: '/api-docs.json',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`📄 Swagger JSON at http://localhost:${PORT}/api-docs.json`);
});