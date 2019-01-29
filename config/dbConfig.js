const mongoose = require('mongoose');

let mongo = {
    uri: (process.env.NODE_ENV === 'production') ? process.env.MONGO_URI : 'mongodb://localhost/userAuth',
    port: 27017
}

mongoose.Promise = global.Promise;

mongoose.connect(mongo.uri, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("DB:Error", err);
    } else {
        console.log("Connected to DB");
    }
})