import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    isNum,
} from '../helpers/validations';
  
import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
   * Create A Staff
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Staff)
   */
  const createStaff = async (req, res) => {
    const {
      email, first_name, last_name, password, resid,
    } = req.body;

    console.log('body: ', req.body)
    console.log('email: ', email)
    console.log('first_name: ', first_name)
    console.log('last_name: ', last_name)
    console.log('password: ', password)
    console.log('resid: ', resid)


    // const created_on = moment(new Date());
    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password) || isEmpty(resid)) {
      errorMessage.error = 'Email, password, first name, last name and restauarnt id fields cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email';
      return res.status(status.bad).send(errorMessage);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than five(5) characters';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isNum(resid)) {
      errorMessage.error = 'Please input a numerical value for your restaurant id';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (resid.indexOf('.') != -1) {
      errorMessage.error = 'Please input only whole numbers';
      return res.status(status.bad).send(errorMessage.error);
    }
    const hashedPassword = hashPassword(password);
    const createStaffQuery = `INSERT INTO
        Staff(email, first_name, last_name, password, restaurantid)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      email,
      first_name,
      last_name,
      hashedPassword,
      Number(resid),
    ];

    console.log('values: ', values);
  
    try {
      const { rows } = await dbQuery.query(createStaffQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Staff with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      if (error.routine === 'ri_ReportViolation') {
        errorMessage.error = 'That restaurant id does not exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };
  
  /**
     * Signin
     * @param {object} req
     * @param {object} res
     * @returns {object} staff object
     */
  const signinStaff = async (req, res) => {
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      errorMessage.error = 'Email or Password detail is missing';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email or Password';
      return res.status(status.bad).send(errorMessage.error);
    }
    const signinStaffQuery = 'SELECT * FROM Staff WHERE email = $1';
    try {
      const { rows } = await dbQuery.query(signinStaffQuery, [email]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = 'Staff with this email does not exist';
        console.log(errorMessage);
        return res.status(status.notfound).send(errorMessage.error);
      }
      if (!comparePassword(dbResponse.password, password)) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(status.bad).send(errorMessage.error);
      }
      // const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      delete dbResponse.password;
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */ 

 const searchStaffFirstnameOrLastname = async (req, res) => {
    const { first_name, last_name } = req.query;
    const searchQuery = 'SELECT * from Staff WHERE first_name =$1 OR last_name =$2 ORDER BY id DESC';
    try {
      const { rows } = await dbQuery.query(searchQuery, [first_name, last_name]);
      const dbResponse = rows;
      if (!dbResponse[0]) {
        errorMessage.error = 'No user with such names';
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage);
    }
    catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);

    }
  };
  
  export {
    createStaff,
    signinStaff,
    searchStaffFirstnameOrLastname,
  };
