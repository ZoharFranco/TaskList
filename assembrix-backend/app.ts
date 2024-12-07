import express, {Application} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./src/utils/swaggerUtils/swagger-config.json";

import authRoutes from "./src/routes/authRoutes";
import taskRoutes from "./src/routes/taskRoutes";
import generalRoutes from "./src/routes/generalRoutes";
import bodyParser from "body-parser";
import {loggerMiddleware} from "./src/logger/logger";
import {sqlInjectionMiddleware, xssMiddleware} from "./src/utils/securityUtils/securityMiddlewares";
import {rateLimitMiddleware} from "./src/utils/securityUtils/rateLimitMiddlewares";


const app: Application = express();


// set CORS middleware to the entire app
const corsOptions = {
    origin: 'https://localhost:8081',  // Vue.js frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));


// Set app default parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set logger
const debug: boolean = false;
if (debug) app.use(loggerMiddleware);

// Set security middlewares
[sqlInjectionMiddleware, xssMiddleware].forEach((middleware) => app.use(middleware));

// Rate limit middlewares
[rateLimitMiddleware].forEach((middleware) => app.use(middleware));

// Set routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(generalRoutes);
app.use(authRoutes);
app.use(taskRoutes);


// Preventing Server Shutdown on Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});

export default app;

