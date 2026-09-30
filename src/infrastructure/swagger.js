const swaggerOptions = {
  info: {
    version: '1.0.0',
    title: 'API Raízes do Nordeste',
    description: 'API desenvolvida para o projeto multidisciplinar da UNINTER'
  },
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  baseDir: process.cwd(),
  filesPattern: './src/**/*.js',
  swaggerUIPath: '/documentation',
  exposeSwaggerUI: true,
  exposeApiDocs: false,
}

export default swaggerOptions;