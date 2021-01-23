const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');
const bodyParser = require('body-parser');
const userApi = require('./api/user');

const app = express();

const config = require('./config.json')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_LINK = config.mongoLink

mongoose.connect(MONGODB_LINK, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`MongoDb connection established successfully`);
});


app.use(cors())
app.use('/user', userApi);

const port = config.PORT || process.env.PORT

app.listen(port , () => console.log(`working on port ${port}`))