const app = require('./src/app');
const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));