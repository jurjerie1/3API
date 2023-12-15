import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Votre API',
            version: '1.0.0',
            description: 'Documentation de votre API',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Serveur local',
            },
        ],
    },
    apis: ['./routes/*.ts', './models/*.ts', './controlers/*.ts'],
    encoding: 'utf-8',
    failOnErrors: false,
    verbose: false,
    format: 'json',
    definition: {
        info: {
            title: 'Votre API',
            version: '1.0.0',
            description: 'Documentation de votre API',
        },
    },
};

export default swaggerOptions;
