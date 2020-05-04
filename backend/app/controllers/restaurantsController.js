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

  const searchQuery = "SELECT * from Restaurant WHERE lower(resname) like '%' || lower($1) || '%'";
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
    return res.status(status.error).send(errorMessage.error);
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

  const searchQuery = "SELECT * from Restaurant WHERE resid=$1";
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
    return res.status(status.error).send(errorMessage.error);
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
      name, min, 
    } = req.body;

    console.log('name: ', name)
    console.log('min: ', min)


    // const created_on = moment(new Date());
    if (isEmpty(name) || isEmpty(min)) {
      errorMessage.error = 'Restaurant name and min. spending fields cannot be empty';
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
    const createRestaurantQuery = `INSERT INTO
        Restaurant(ResName, MinSpending)
        VALUES($1, $2)
        returning *`;
    const values = [
      name,
      min,
    ];
  
    try {
      const { rows } = await dbQuery.query(createRestaurantQuery, values);
      const dbResponse = rows[0];
      // delete dbResponse.password;
      successMessage.data = dbResponse;
      console.log(successMessage.data);
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Restaurant with that name already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

    /**
   * Edit A restaurant
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Customer)
   */
  const editRestaurant = async (req, res) => {
    const {
      resname, min, id
    } = req.body;

    console.log('body: ', req.body)
    console.log('resname: ', resname)
    console.log('min: ', min)
    console.log('id: ', id)

    if (!isNum(min)) {
      errorMessage.error = 'Please input a numerical value for min. spending';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (min.indexOf('.') != -1) {
      errorMessage.error = 'Please input only whole numbers';
      return res.status(status.bad).send(errorMessage.error);
    }

    const editRestaurantQuery = `UPDATE restaurant set
        ResName = $1,
        Min_Spending = $2,
        where id = $3
        returning *`;
    const values = [
      resname,
      min,
      id
    ];
  
    try {
      const { rows } = await dbQuery.query(editRestaurantQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Restaurant with that NAME already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * delete a restaurant
   */
  const deleteRestaurant = async (req, res) => {
    const { id } = req.body;
    const deleteRestaurantQuery = 'delete from restaurant where id = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteRestaurantQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };
  
export {
    searchRestaurant,
    getRestaurant,
    createRestaurant,
    editRestaurant,
    deleteRestaurant
};