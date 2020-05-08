import moment from 'moment';

import dbQuery from '../db/dev/dbQuery';

import {
    hashPassword,
    comparePassword,
    isValidEmail,
    validatePassword,
    isEmpty,
    isNum,
    startDateError,
    durationError,
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
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than five(5) characters';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!isNum(resid)) {
      errorMessage.error = 'Please input a numerical value for your restaurant id';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (resid.indexOf('.') != -1) {
      errorMessage.error = 'Please input only whole numbers';
      return res.status(status.bad).send(errorMessage.error);
    }
    // const hashedPassword = hashPassword(password);
    const createStaffQuery = `INSERT INTO
        Staff(email, first_name, last_name, password, restaurantid)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      email,
      first_name,
      last_name,
      password,
      Number(resid),
    ];

    console.log('values: ', values);
  
    try {
      const { rows } = await dbQuery.query(createStaffQuery, values);
      const dbResponse = rows[0];
      // delete dbResponse.password;
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage.data);
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
      // delete dbResponse.password;
      successMessage.data = dbResponse;
    //   successMessage.data.token = token;
      return res.status(status.success).send(successMessage.data);
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
        return res.status(status.notfound).send(errorMessage.error);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    }
    catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);

    }
  };

      /**
   * Edit A staff
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object (of Customer)
   */
  const editStaff = async (req, res) => {
    const {
      email, first_name, last_name, password, id
    } = req.body;

    console.log('body: ', req.body)
    console.log('email: ', email)
    console.log('first_name: ', first_name)
    console.log('last_name: ', last_name)
    console.log('password: ', password)
    console.log('id: ', id)

    if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
      errorMessage.error = 'Email, password, first name and last name fields cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email)) {
      errorMessage.error = 'Please enter a valid Email';
      return res.status(status.bad).send(errorMessage.error);
    }
    if (!validatePassword(password)) {
      errorMessage.error = 'Password must be more than five(5) characters';
      return res.status(status.bad).send(errorMessage.error);
    }
    const editStaffQuery = `UPDATE Staff set
        email = $1,
        first_name = $2,
        last_name = $3,
        password = $4
        where id = $5
        returning *`;
    const values = [
      email,
      first_name,
      last_name,
      password,
      id
    ];
  
    try {
      const { rows } = await dbQuery.query(editStaffQuery, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.created).send(successMessage.data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        errorMessage.error = 'Staff with that EMAIL already exist';
        return res.status(status.conflict).send(errorMessage.error);
      }
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * delete a staff
   */
  const deleteStaff = async (req, res) => {
    const { id } = req.body;
    const deleteStaffQuery = 'delete from staff where id = $1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteStaffQuery, [id]);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * get all fds's promotions (dont care end date)
   */
  const getPromotions = async (req, res) => {
    // const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from fdspromotion)';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery);
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
   * get all fds's ongoing promotions (end date > now)
   */
  const getOngoingPromotions = async (req, res) => {
    // const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from fdspromotion) and enddate > now()';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery,);
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
   * get all fds's past promotions (end date < now)
   */
  const getPastPromotions = async (req, res) => {
    // const { id } = req.body;
    const getPromotionsQuery = 'select * from promotion where promotionid = any(select promotionid from fdspromotion) and enddate < now()';
    try {
      const { rows } = await dbQuery.query(getPromotionsQuery);
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
  const createFDSPromotion = async (req, res) => {
    const { start, end, min, disc, freedeli, managerid } = req.body;
    const createPromotionQuery = 'insert into promotion(startdate, enddate, minspending, percentageoff, freedelivery) values($1,$2,$3,$4,$5) returning *';
    const values = [
      start,
      end,
      min,
      disc,
      freedeli
    ];
    const addFDSPromoQuuery = 'insert into fdspromotion(promotionid,managerid) values($1,$2)';
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
        managerid
      ]
      await dbQuery.query(addFDSPromoQuuery, newvalues)
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
   * delete fds promotion
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
  };

  /**
   * get top 5 items sold by restaurant (by date)
   */
  const getTopItems = async (req, res) => {
    const { id } = req.body;
    const deletePromotionQuery = 'with ordercount (itemid, count) as ( select itemid, count(*) from contains group by itemid) select itemid from ordercount where itemid = any(select itemid from listings where resid = $1)  order by count desc limit 5';
    try {
      const { rows } = await dbQuery.query(deletePromotionQuery, [id]);
      const dbResponse = rows;
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  };

  /**
   * get top 5 within a preiod
   */
  const getTopItemsWithin = async(req, res) => {
    const { id, start, end } = req.body;
    console.log('omomomomo???', req.body)
    const query = 'with ordercount (itemid, count) as (select itemid, count(*)from contains where orderid = any (select orderid from orders where ordered_on >= $2 and ordered_on <= $3) group by itemid) select itemname from fooditem where itemid = any (select itemid  from ordercount  where itemid = any( select itemid from listings where resid = $1 order by count desc  limit 5))'
    const values = [
      id,
      start, 
      end
    ]
    try {
      const { rows } = await dbQuery.query(query, values);
      const dbResponse = rows;
      console.log('dbResponse: ', dbResponse)
      if (!rows[0]) {
        errorMessage.error = "No data found... Try another date"
        return res.status(status.notfound).send(errorMessage.error);
      }
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get total cost of orders within a period
   */
  const getTotalCostWithin = async(req, res) => {
    const { id, start, end } = req.body;
    const query = 'select sum(foodfee) from receipt where orderid = any(select orderid from contains where itemid = any(select itemid from listings where resid = $1)) and orderid = any (select orderid from orders where ordered_on >= $2 and ordered_on <= $3)'
    const values = [
      id,
      start, 
      end
    ]
    try {
      const { rows } = await dbQuery.query(query, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }

  /**
   * get total no. of orders within a period
   */
  const getTotalOrderCountWithin = async(req, res) => {
    const { id, start, end } = req.body;
    const query = 'select count(orderid) from orders where orderid = any( select orderid from contains where itemid = any(select itemid from listings where resid = $1)) and ordered_on >= $2 and ordered_on <= $3'
    const values = [
      id,
      start, 
      end
    ]
    try {
      const { rows } = await dbQuery.query(query, values);
      const dbResponse = rows[0];
      successMessage.data = dbResponse;
      return res.status(status.success).send(successMessage.data);
    } catch (error) {
      console.log(error);
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage.error);
    }
  }


  
  export {
    createStaff,
    signinStaff,
    searchStaffFirstnameOrLastname,
    editStaff,
    deleteStaff,
    getOngoingPromotions,
    getPastPromotions,
    getPromotionInformation,
    getPromotions,
    createFDSPromotion,
    deletePromotion,
    editPromotion,
    getTopItems,
    getTopItemsWithin,
    getTotalCostWithin,
    getTotalOrderCountWithin,

};