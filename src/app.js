import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import swaggerOptions from '#infra/swagger.js';
import clientsRoutes from '#routes/clients.routes.js';
import authRoutes from '#routes/auth.routes.js';

const app = express();

expressJSDocSwagger(app)(swaggerOptions);

app.use(express.json());

app.use('/clientes', clientsRoutes);
app.use('/auth', authRoutes);

export default app;