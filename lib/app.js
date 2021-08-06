import express from 'express';
import npcsController from './controllers/Npcs.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


app.use(npcsController);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
