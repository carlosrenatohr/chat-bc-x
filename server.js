import express from "express";
const app = express();

import middleware  from './src/middlewares/index.js';
import orderRouter from './src/routes/order.js';

app.use(middleware);
app.use(orderRouter);

function startServer() {
    const PORT = process.env.PORT || 3001;

    const server = app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`)
    });

    return {app, server};
}
startServer();


export default startServer;