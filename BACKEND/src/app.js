import express from "express";
import { Router as AiRoute } from './routes/ai.route.js';
import cors from 'cors'
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));


app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/api/ai', AiRoute)

export default app;