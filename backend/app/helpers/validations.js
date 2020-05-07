/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
  return (hashedPassword === password);
  // return bcrypt.compareSync(password, hashedPassword);
};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};

/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

const isNum = (input) => {
  if (!isNaN(Number(input))) {
    return true;
  } return false;
}

// /**
//    * empty helper method
//    * @param {string, integer} input
//    * @returns {Boolean} True or False
//    */
// const empty = (input) => {
//   if (input === undefined || input === '') {
//     return true;
//   }
// };

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  const empty = (input) => {
    if (input === undefined) {
      return true;
    }
  };

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (email, id, is_admin, first_name, last_name) => {
  const token = jwt.sign({
    email,
    user_id: id,
    is_admin,
    first_name,
    last_name,
  },
  env.secret, { expiresIn: '3d' });
  return token;
};

/**
 * check if start date > now
 */
const startDateError = (startdate) => {
  if (startdate < today) {
    return true;
  }
  return false;
}

/**
 * check if start date < end date
 */
const durationError = (startdate, enddate) => {
  if (startdate > enddate) {
    return true;
  }
  return false;
}

export {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  empty,
  generateUserToken,
  isNum,
  startDateError,
  durationError,
};