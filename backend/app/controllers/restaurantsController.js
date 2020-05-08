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

  /**
   * get food's availability
   */
  const getFoodAvailability = async (req, res) => {
    const { id } = req.body;
    const getFoodQuery = 'select * from inventory where itemid = $1';
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

  /**
   * get all restaurant's promotions (dont care end date)
   */
  const getPromotions = async (req, res) => {
    const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from restaurantpromotion where resid = $1)';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery, [id]);
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
   * get all restaurant's ongoing promotions (end date > now)
   */
  const getOngoingPromotions = async (req, res) => {
    const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from restaurantpromotion where resid = $1) and enddate > now()';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery, [id]);
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
   * get all restaurant's past promotions (end date < now)
   */
  const getPastPromotions = async (req, res) => {
    const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from restaurantpromotion where resid = $1) and enddate < now()';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery, [id]);
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
   * get details of promotion
   */
  const getPromotionInformation = async (req, res) => {
    const { id } = req.body;
    const getPromotionInfoQuery = 'select * from promotion where promotionid = $1';
    try {
      const { rows } = await dbQuery.query(getPromotionInfoQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log(id);
      console.log(successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * create new promotion
   */
  const createRestaurantPromotion = async (req, res) => {
    const { start, end, min, disc, freedeli, resid } = req.body;
    const createPromotionQuery = 'insert into promotion(startdate, enddate, minspending, percentageoff, freedelivery) values($1,$2,$3,$4,$5) returning *';
    const values = [
      start,
      end,
      min,
      disc,
      freedeli
    ];
    const addRestaurantPromoQuuery = 'insert into restaurantpromotion(promotionid,resid) values($1,$2)';
    if (disc > 100) {
      errorMessage.error = 'Discount percentage cannnot be over 100.';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (isEmpty(start) || isEmpty(end)) {
      errorMessage.error = 'Start Date and End Date fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (startDateError(start)) {
      errorMessage.error = 'Start Date must not have passed.';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (durationError(start,end)) {
      errorMessage.error = 'Start Date must before End Date';
      return res.status(status.bad).send(errorMessage.error);
    }
    try {
      await dbQuery.query('begin')
      const { rows } = await dbQuery.query(createPromotionQuery, values);
      const promotionid = rows[0].promotionid;
      const newvalues = [
        promotionid,
        resid
      ]
      await dbQuery.query(addRestaurantPromoQuuery, newvalues)
      await dbQuery.query('commit');
      successMessage.data = promotionid;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      await dbQuery.query('rollback');
      errorMessage.error = 'Operation was not successful';
      return res.sendStatus(status.success).send(errorMessage.error);
    }
  }

  /**
   * delete restaurant promotion
   */
  const deletePromotion = async (req, res) => {
    const { id } = req.body;
    const deletePromotionQuery = 'delete from promotion where promotionid = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deletePromotionQuery, [id]);
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
   * get category of food item
   */
  const getCategory = async (req, res) => {
    const { id } = req.body;
    const getCategoryQuery = 'select distinct categoryname from category where catid = any(select catid from classifies where itemid = $1)';
    try {
      const { rows } = await dbQuery.query(getCategoryQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log(id);
      console.log(successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * add new food to restaurant menu
   */
  const newFoodItem = async (req, res) => {
    const { name, price,  limit, resid } = req.body;
    const newFoodQuery = 'insert into fooditem(itemname,cost,maxlimit) values($1, $2, $3) returning *';
    const setInventoryQuery = 'insert into inventory(itemid, amt_available) values($1,$2)';
    const insertListingQuery = 'insert into listings (resid, itemid) values($1,$2)';
    const values = [
      name,
      price,
      limit,
    ];
    if (isEmpty(name) || isEmpty(price.toString()) ||  isEmpty(limit.toString())) {
      errorMessage.error = 'Item name, price, and max. limit fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }

    try {
      await dbQuery.query('begin')
      const { rows } = await dbQuery.query(newFoodQuery, values);
      const id = rows[0].itemid;
      const values2 = [
        id,
        limit
      ]
      const values3 = [
        resid,
        id
      ]
      await dbQuery.query(setInventoryQuery, values2);
      await dbQuery.query(insertListingQuery, values3);
      await dbQuery.query('commit');
      successMessage.data = id;
      console.log(id);
      console.log(successMessage.data);
      return res.sendStatus(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      await dbQuery.query('rollback');
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * delete food item from restaurant
   */
  const deleteFood = async (req, res) => {
    const { id } = req.body;
    const deleteFoodQuery = 'delete from fooditem where itemid = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteFoodQuery, [id]);
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
   * get restaurant serving food
   */
  const getRestaurantFromFood = async (req, res) => {
    const { id } = req.body;
    const query = 'select distinct resid, resname from restaurant where resid = (select resid from listings where itemid = $1)';
    try {
      const { rows } = await dbQuery.query(query, [id]);
      console.log('hello', dbResponse)
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log(successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * get only available for sale food item
   */
  const getRestaurantAvailables = async (req, res) => {
    const { id } = req.body;
    const getRestaurantAvailablesQuery = 'select itemid from fooditem where itemid = any(select itemid from listings where resid = $1) and itemid = any(select itemid from inventory where available = true)';
    try {
      const { rows } = await dbQuery.query(getRestaurantAvailablesQuery, [id]);
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
   * search for available food
   */
  const searchAvailableFood = async (req, res) => {
    const { keywords } = req.body;
    console.log('keywords: ', keywords)
    const searchAvailableFoodQuery = "SELECT * from fooditem WHERE lower(itemname) like '%' || lower($1) || '%' and itemid = any(select itemid from inventory where available = true)";
    try {
      const { rows } = await dbQuery.query(searchAvailableFoodQuery, [keywords]);
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
   * search for all food
   */
  const searchAllFood = async (req, res) => {
    const { keywords } = req.body;
    const searchAllFoodQuery = "SELECT * from fooditem WHERE lower(itemname) like '%' || lower($1) || '%'";
    try {
      const { rows } = await dbQuery.query(searchAllFoodQuery, [keywords]);
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
   * get restaurant name from id
   */
  const getRestaurantName = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "SELECT resname from restaurant WHERE resid = $1";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('???: ', successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * edit food item
   * update restaurant set
      resname = $1,
      minspending = $2
      where resid = $3
      returning *`;
   */
  const editFood = async (req, res) => {
    const { name, price,  limit, itemid, avail } = req.body;
    console.log('name: ', name);
    console.log('price: ', price);
    console.log('limit: ', limit);
    console.log('itemid: ', itemid);
    console.log('avail: ', avail);
    const editFoodQuery = 'update fooditem set itemname = $1, cost = $2, maxlimit = $3 where itemid = $4 returning *';
    const editInventoryQuery = 'update inventory set available = $1 where itemid = $2';
    const foodvalues = [
      name,
      price,
      limit,
      itemid, 
    ];
    const inventoryvalues = [
      avail,
      itemid, 
    ];
    if (isEmpty(name) || isEmpty(price.toString()) ||  isEmpty(limit.toString())) {
      errorMessage.error = 'Item name, price, and max. limit fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }

    try {
      await dbQuery.query('begin')
      const { rows } = await dbQuery.query(editFoodQuery, foodvalues);
      const id = rows[0].itemid;
      await dbQuery.query(editInventoryQuery, inventoryvalues);
      await dbQuery.query('commit');
      successMessage.data = id;
      console.log(id);
      console.log(successMessage.data);
      return res.sendStatus(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      await dbQuery.query('rollback');
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * edit promotion
   */
  const editPromotion = async (req, res) => {
    const { start, end, min, disc, freedeli, id } = req.body;
    const editPromotionQuery = 'update promotion set startdate = $1, enddate = $2, minspending = $3, percentageoff = $4, freedelivery = $5 where promotionid = $6 returning *';
    const values = [
      start,
      end,
      min,
      disc,
      freedeli,
      id
    ];
    if (disc > 100) {
      errorMessage.error = 'Discount percentage cannnot be over 100.';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (isEmpty(end)) {
      errorMessage.error = 'End Date fields cannot be empty';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (durationError(start,end)) {
      errorMessage.error = 'Start Date must before End Date';
      return res.status(status.bad).send(errorMessage.error);
    }
    try {
      const { rows } = await dbQuery.query(editPromotionQuery, values);
      successMessage.data = rows[0];
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.sendStatus(status.error).send(errorMessage.error);
    }
  }

  /**
   * get min spending of a restaurant
   */
  const getMinSpending = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "SELECT minspending from restaurant WHERE resid = $1";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('???: ', successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get all orders from restaurant
   */
  const getOrders = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "select distinct orderid from contains where itemid = any(select itemid from listings where resid = $1)";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('omo: ', successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get items in restaurant order
   */
  const getOrderItems = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "select * from contains where orderid = $1";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('???: ', successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get order date of order
   */
  const getOrderDate = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "select * from orders where orderid = $1";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      console.log('???: ', successMessage.data);
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get reviews for restaurant
   */
  const getRestaurantReviews = async (req, res) => {
    const { id } = req.body;
    const getRestaurantNameQuery = "select * from reviews where itemid = any(select itemid from listings where resid = $1)";
    try {
      const { rows } = await dbQuery.query(getRestaurantNameQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      console.log('reviewa: ', successMessage.data);
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
    getFoodAvailability,
    getPromotions,
    getPromotionInformation,
    getOngoingPromotions,
    getPastPromotions,
    createRestaurantPromotion,
    deletePromotion,
    getCategory,
    newFoodItem,
    deleteFood,
    getRestaurantFromFood,
    getRestaurantAvailables,
    searchAvailableFood,
    searchAllFood,
    getRestaurantName,
    editFood,
    editPromotion,
    getMinSpending,
    getOrders,
    getOrderItems,
    getOrderDate,
    getRestaurantReviews
};