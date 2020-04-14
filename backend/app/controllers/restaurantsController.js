import dbQuery from '../db/dev/dbQuery';

import {
    errorMessage, successMessage, status,
} from '../helpers/status';

/**
 * @params {Object} req
 * @params {Object} res
 * @returns return firstname and Lastname
 */ 

// const searchRestaurant = async (req, res) => {
//     const { search } = req.body;
//     const searchQuery = "SELECT * from Restaurants WHERE lower(name) like '%' || lower($1) || '%'";
//     const values = [ search ];

//     try {
//       const { rows } = await dbQuery.query(searchQuery, values);
//       const dbResponse = rows;
//       if (!dbResponse[0]) {
//         errorMessage.error = 'No restaurants found :(';
//         return res.status(status.notfound).send(errorMessage.error);
//       }
//       successMessage.data = dbResponse;
//       return res.status(status.success).send(dbResponse);
//     }
//     catch (error) {
//       errorMessage.error = 'Operation was not successful';
//       return res.status(status.error).send(errorMessage);

//     }
// };

/**
 * search for restaurants
 * @param {object} req
 * @param {object} res
 * @returns {object} returned resid
 */
const searchRestaurant = async (req, res) => {
  const { keywords } = req.query;
  console.log('query: ', keywords);
  // for (const key in req.query) {
  //   console.log(key, req.query[key])
  // }

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
  
export {
    searchRestaurant,
};