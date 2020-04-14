import dbQuery from '../db/dev/dbQuery';

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
  
export {
    searchRestaurant,
    getRestaurant
};