const express = require('express');
const bodyParser = require('body-parser');
const { bigcommerce } = require('./bigCommerce');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send(`{bitcommerce} and 'express is with ${process.env.BigCommerceClientSecret}`));

app.post('/webhook', async (req, res) => {
    
});

app.listen(port, () => console.log("Example app listening on port ${port}!"));