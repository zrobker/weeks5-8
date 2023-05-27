const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'NFL teams API',
    description: 'NFL teams API'
  },
  host: 'zr-weeks5-8.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
