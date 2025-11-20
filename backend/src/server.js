import express from 'express';

import tasksRoutes from './routes/tasksRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'

dotenv.config();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();


const app = express();

// middlewares
app.use(cors({origin: "http://localhost:5173"}));

app.use(express.json());

app.use("/api/tasks", tasksRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


