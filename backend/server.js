import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import customersRoute from './app/routes/customersRoute';

const app = express();
const bodyParser = require('body-parser')

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/customer', customersRoute);

app.listen(env.port).on('listening', () => {
    console.log(`🚀 are live on ${env.port}`);
});


export default app;  