const app = require('./server.js');

const port = 5000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});