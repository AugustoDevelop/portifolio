const express = require('express');
const app = express();
const connectDB = require('./config/db.config');
const swaggerUi = require('swagger-ui-express');
const swagerDocs = require('./src/util/swagger.json');
const errorHandler = require('./src/shared/error-handler');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use(cors({
  "origin": "*",
  "methods": "GET,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDocs));
app.use('/users', require('./src/router/userRouter'));
app.use('/roles', require('./src/router/roleRouter'));
app.use('/auth', require('./src/router/authRouter'));

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000);
