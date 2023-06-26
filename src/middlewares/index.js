import express from "express";
const middleware = express.Router();

middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));
console.log('middleware loaded')

export default middleware;