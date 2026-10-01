import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import swaggerOptions from '#infra/swagger.js';
import rotasClientes from '#routes/clientes.routes.js';
import rotasAutenticacao from '#routes/auth.routes.js';
import rotasPedidos from '#routes/pedidos.routes.js';

const app = express();

expressJSDocSwagger(app)(swaggerOptions);

app.use(express.json());

app.use('/clientes', rotasClientes);
app.use('/auth', rotasAutenticacao);
app.use('/pedidos', rotasPedidos);

export default app;
