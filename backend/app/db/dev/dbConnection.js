//db/dev/dbConnection.js

import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Customer Table
 * CREATE TABLE Customers
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createCustomerTable = () => {
  const customerCreateQuery = `CREATE TABLE IF NOT EXISTS Customers
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  is_admin BOOL DEFAULT(false),
  created_on DATE NOT NULL)`;

  pool.query(customerCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop Customer Table
 */
const dropCustomerTable = () => {
  const customerDropQuery = 'DROP TABLE IF EXISTS Customers';
  pool.query(customerDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropCustomerTable();
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  dropAllTables();
  createCustomerTable();
};


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');