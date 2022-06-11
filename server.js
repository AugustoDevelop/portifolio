const express = require('express');
const app = express();
const connectDB = require('./config/db.config');
const swaggerUi = require('swagger-ui-express');
const swagerDocs = require('./src/util/swagger.json');
const errorHandler = require('./src/shared/error-handler');

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDocs));
app.use('/users', require('./src/router/userRouter'));
app.use('/roles', require('./src/router/roleRouter'));
app.use('/auth', require('./src/router/authRouter'));

// global error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000);
