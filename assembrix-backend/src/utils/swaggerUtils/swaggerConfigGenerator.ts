import swaggerAutogen from 'swagger-autogen';

const swaggerOptions = {
    info: {
        title: 'Tasks API',
        description: 'Automatically generated API documentation',
    },
    host: 'localhost:3000',
    schemes: ['https'],
};

const outputFile = './swagger-config.json';
const endpointsFiles = ['../../../src/routes/*.ts'];

swaggerAutogen()(outputFile, endpointsFiles, swaggerOptions);