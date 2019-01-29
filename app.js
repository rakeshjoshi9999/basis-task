const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const dbConfig = require('./config/dbConfig');

const app = express();

const config = require('./config');
const routes = require('./routes');

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(config.Routes.Users, routes.userRoute);

// home route
app.get('/', (req, res) => {
    res.json({
        'message': 'Server is Live'
    });
});

// start the server
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running at Port: ${port}`);
});


