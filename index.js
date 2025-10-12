import express from 'express';
import cors from 'cors';
import { globalErrorHandler, AppError } from './utils/appError.js';
import morgan from 'morgan';
import * as db from './config/db.js';

const app = express();

db.conectar();

app.use(express.json());
app.use(morgan('combined'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));



app.use((req, res, next) => {
  const error = new AppError(`No se pudo acceder a: ${req.originalUrl} en el servidor.`, 404);
  next(error);
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
