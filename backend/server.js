import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import customersRoute from './app/routes/customersRoute';
import managersRoute from './app/routes/managersRoute';
import ridersRoute from './app/routes/ridersRoute';
import staffRoute from './app/routes/staffRoute';


const app = express();
const bodyParser = require('body-parser')

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/customer', customersRoute);
app.use('/api/v1/manager', managersRoute);
app.use('/api/v1/rider', ridersRoute);
app.use('/api/v1/staff', staffRoute);

app.listen(env.port).on('listening', () => {
    console.log(`🚀 are live on ${env.port}`);
});


export default app;  