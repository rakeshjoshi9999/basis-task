const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({
        'message': 'Server is Live'
    });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running at Port: ${port}`);
});


