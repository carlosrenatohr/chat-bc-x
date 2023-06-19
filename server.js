const express = require("express");
const app = express();

const middleware = require('./src/middlewares');
const orderRouter = require('./src/routes/order');

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


module.exports = startServer;