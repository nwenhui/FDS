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
 * search for restaurants
 * @param {object} req
 * @param {object} res
 * @returns {object} returned resid
 */
const searchRestaurant = async (req, res) => {
  const { keywords } = req.query;

  const searchQuery = "SELECT * from Restaurants WHERE lower(name) like '%' || lower($1) || '%'";
  try {
    const { rows } = await dbQuery.query(searchQuery, [keywords]);
    const dbResponse = rows;
    if (!dbResponse[0]) {
      errorMessage.error = 'No restaurants found :(';
      return res.status(status.notfound).send(errorMessage.error);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(dbResponse);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

/**
 * get restaurant detail
 * @param {object} req
 * @param {object} res
 * @returns {object} returned resid
 */
const getRestaurant = async (req, res) => {
  const { resid } = req.body;
  console.log('resid: ', resid);

  const searchQuery = "SELECT * from Restaurants WHERE resid=$1";
  try {
    const { rows } = await dbQuery.query(searchQuery, [resid]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'No restaurants found :(';
      return res.status(status.notfound).send(errorMessage.error);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(dbResponse);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Create A Restaurant
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Customer)
   */
  const createRestaurant = async (req, res) => {
    const {
      name, min, address,
    } = req.body;

    console.log('name: ', name)
    console.log('min: ', min)
    console.log('address: ', address)


    // const created_on = moment(new Date());
    if (isEmpty(name) || isEmpty(min) || isEmpty(address)) {
      errorMessage.error = 'Restaurant name, min. spending and address fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isNum(min)) {
      errorMessage.error = 'Please input a numerical value for min. spending';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (min.indexOf('.') != -1) {
      errorMessage.error = 'Please input only whole numbers';
      return res.status(status.bad).send(errorMessage.error);
    }
    // if (!validatePassword(password)) {
    //   errorMessage.error = 'Password must be more than five(5) characters';
    //   return res.status(status.bad).send(errorMessage.error);
    // }
    // const hashedPassword = hashPassword(password);
    const createRestaurantQuery = `INSERT INTO
        Restaurants(name, minspending, addressdetails)
        VALUES($1, $2, $3)
        returning *`;
    const values = [
      name,
      min,
      address,
      // hashedPassword,
      // created_on,
    ];
  
    try {
      const { rows } = await dbQuery.query(createRestaurantQuery, values);
      const dbResponse = rows[0];
      delete dbResponse.password;
    //   const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.created).send(successMessage);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Restaurant with that name already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };
  
export {
    searchRestaurant,
    getRestaurant,
    createRestaurant
};