import express from "express";
const Router = express.Router();
import { generate ,get_revivew } from "../controllers/ai.controller.js"; // Ensure .js is included



Router.get('/get-response', generate)
Router.post('/get-review', get_revivew)

export {Router};