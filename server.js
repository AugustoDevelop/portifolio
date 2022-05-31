const express = require('express');
const app = express();
const connectDB = require('./config/db.config');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/users', require('./src/router/userRouter'));
app.use('/auth', require('./src/router/authRouter'));

app.listen(process.env.PORT || 3000);
