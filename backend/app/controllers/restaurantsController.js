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

    console.log('name: ', resname)
    console.log('min: ', min)
    console.log('id: ', id)


    // const created_on = moment(new Date());
    if (isEmpty(resname) || isEmpty(min)) {
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
    const editRestaurantQuery = `update restaurant set
      resname = $1,
      minspending = $2
      where resid = $3
      returning *`;
    const values = [
      resname,
      min,
      id,
    ];
  
    try {
      const { rows } = await dbQuery.query(editRestaurantQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      console.log(error);
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
    const deleteRestaurantQuery = 'delete from restaurant where resid = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteRestaurantQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * get restaurant's menu (entire list of food items)
   * return itemid
   */
  const getRestaurantMenu = async (req, res) => {
    const { id } = req.query;
    const getRestaurantMenuQuery = 'select itemid from fooditem where itemid = any(select itemid from listings where resid = $1)';
    try {
      const { rows } = await dbQuery.query(getRestaurantMenuQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log(successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get details of food item
   */
  const getFood = async (req, res) => {
    const { id } = req.body;
    const getFoodQuery = 'select * from fooditem where itemid = $1';
    try {
      const { rows } = await dbQuery.query(getFoodQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log(successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }
  
export {
    searchRestaurant,
    getRestaurant,
    createRestaurant,
    editRestaurant,
    deleteRestaurant,
    getRestaurantMenu,
    getFood,
};