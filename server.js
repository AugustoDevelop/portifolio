const express = require('express');
const app = express();
const connectDB = require('./config/db.config');
const swaggerUi = require('swagger-ui-express');
const swagerDocs = require('./src/shared/swagger.json');
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDocs));
app.use('/users', require('./src/router/userRouter'));
app.use('/role', require('./src/router/authRouter'));
app.use('/v1', require('./src/router/loginRouter'));

app.listen(process.env.PORT || 3000);
