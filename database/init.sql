DROP TABLE IF EXISTS FoodItem CASCADE;
DROP TABLE IF EXISTS Restaurant CASCADE;
DROP TABLE IF EXISTS Listings CASCADE;
DROP TABLE IF EXISTS Category CASCADE;
DROP TABLE IF EXISTS Classifies CASCADE;
DROP TABLE IF EXISTS Inventory CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;
DROP TABLE IF EXISTS Promotion CASCADE;
DROP TABLE IF EXISTS restaurantpromotion CASCADE;
DROP TABLE IF EXISTS fdspromotion CASCADE;
DROP TABLE IF EXISTS Rider CASCADE;
DROP TABLE IF EXISTS PartTime CASCADE;
DROP TABLE IF EXISTS FullTime CASCADE;
DROP TABLE IF EXISTS Shifts CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS OrderDetails CASCADE;
DROP TABLE IF EXISTS Contains CASCADE;
DROP TABLE IF EXISTS Journey CASCADE;
DROP TABLE IF EXISTS Delivers CASCADE;
DROP TABLE IF EXISTS Receipt CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Rates CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Salary CASCADE;

CREATE TABLE FoodItem (
    ItemID SERIAL,
    itemname varchar(50),
    Cost INTEGER,
    MaxLimit INTEGER,
    PRIMARY KEY (ItemID)
);

--seed for Western Stall, 1-6
INSERT INTO FoodItem VALUES (DEFAULT, 'Spaghetti', 5, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Carbonara', 5, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Mushroom Soup', 3, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Seafood Chowder', 3, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Chicken Teriyaki Pizza', 13, 90);
INSERT INTO FoodItem VALUES (DEFAULT, 'Garlic Bread', 1, 300);

--seed for drinks, 7-12
INSERT INTO FoodItem VALUES (DEFAULT, 'Coke', 2, 130);
INSERT INTO FoodItem VALUES (DEFAULT, 'Sprite', 2, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Milkshake', 3, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Tea', 1, 300);
INSERT INTO FoodItem VALUES (DEFAULT, 'Coffee', 1, 300);
INSERT INTO FoodItem VALUES (DEFAULT, 'Milo Dinosaur', 4, 100);

--seed for chinese, 13-18
INSERT INTO FoodItem VALUES (DEFAULT, 'Rice', 1, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Stir Fry', 5, 70);
INSERT INTO FoodItem VALUES (DEFAULT, 'Orange Chicken', 5, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Sliced Fish Soup', 7, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Kway Teow', 5, 70);
INSERT INTO FoodItem VALUES (DEFAULT, 'Kang Kong', 3, 200);

--seed for malay, 19-24
INSERT INTO FoodItem VALUES (DEFAULT, 'Nasi Briyani', 5, 230);
INSERT INTO FoodItem VALUES (DEFAULT, 'Mee Goreng', 5, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Nasi Lemak', 5, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Satay', 13, 170);
INSERT INTO FoodItem VALUES (DEFAULT, 'Mee Siam', 5, 100);
INSERT INTO FoodItem VALUES (DEFAULT, 'Ayam Penyet Set', 9, 200);

--seed for indian, 25-30
INSERT INTO FoodItem VALUES (DEFAULT, 'Prata', 8, 200); 
INSERT INTO FoodItem VALUES (DEFAULT, 'Butter Chicken Curry', 5, 450);
INSERT INTO FoodItem VALUES (DEFAULT, 'Naan', 3, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Cheese Prata', 13, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Egg Prata', 13, 200);
INSERT INTO FoodItem VALUES (DEFAULT, 'Muruku', 3, 500);

CREATE TABLE Restaurant (
    ResID SERIAL,
    ResName VARCHAR(100) unique,
    MinSpending INTEGER,
    joined_at timestamp default now(),
    PRIMARY KEY (ResID)
);

INSERT INTO Restaurant VALUES (DEFAULT, 'Western Food', 19, DEFAULT);
INSERT INTO Restaurant VALUES (DEFAULT, 'Drinks Stall', 10, DEFAULT);
INSERT INTO Restaurant VALUES (DEFAULT, 'Chinese Food', 5, DEFAULT);
INSERT INTO Restaurant VALUES (DEFAULT, 'Malay Food', 25, DEFAULT);
INSERT INTO Restaurant VALUES (DEFAULT, 'Indian Food', 50, DEFAULT);

CREATE TABLE Listings (
    ResID INTEGER,
    ItemID INTEGER,
    PRIMARY KEY (ResID, ItemID),
    FOREIGN KEY (ResID) REFERENCES Restaurant on delete cascade,
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete cascade
);

--seed for western
INSERT INTO Listings VALUES (1, 1);
INSERT INTO Listings VALUES (1, 2);
INSERT INTO Listings VALUES (1, 3);
INSERT INTO Listings VALUES (1, 4);
INSERT INTO Listings VALUES (1, 5);
INSERT INTO Listings VALUES (1, 6);

--seed for drinks
INSERT INTO Listings VALUES (2, 7);
INSERT INTO Listings VALUES (2, 8);
INSERT INTO Listings VALUES (2, 9);
INSERT INTO Listings VALUES (2, 10);
INSERT INTO Listings VALUES (2, 11);
INSERT INTO Listings VALUES (2, 12);

--seed for chinese
INSERT INTO Listings VALUES (3, 13);
INSERT INTO Listings VALUES (3, 14);
INSERT INTO Listings VALUES (3, 15);
INSERT INTO Listings VALUES (3, 16);
INSERT INTO Listings VALUES (3, 17);
INSERT INTO Listings VALUES (3, 18);

--seed for malay
INSERT INTO Listings VALUES (4, 19);
INSERT INTO Listings VALUES (4, 20);
INSERT INTO Listings VALUES (4, 21);
INSERT INTO Listings VALUES (4, 22);
INSERT INTO Listings VALUES (4, 23);
INSERT INTO Listings VALUES (4, 24);

--seed for indian
INSERT INTO Listings VALUES (5, 25);
INSERT INTO Listings VALUES (5, 26);
INSERT INTO Listings VALUES (5, 27);
INSERT INTO Listings VALUES (5, 28);
INSERT INTO Listings VALUES (5, 29);
INSERT INTO Listings VALUES (5, 30);

CREATE TABLE Category (
    catid serial,
    CategoryName VARCHAR(20),
    PRIMARY KEY (catid)
);

INSERT INTO Category VALUES (DEFAULT, 'For Sharing');
INSERT INTO Category VALUES (DEFAULT, 'Main');
INSERT INTO Category VALUES (DEFAULT, 'Finger Food');

CREATE TABLE Classifies (
    catid integer,
    ItemID INTEGER,
    PRIMARY KEY (catid, ItemID),
    FOREIGN KEY (catid) REFERENCES Category,
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete cascade
);

INSERT INTO Classifies VALUES (1, 6);
INSERT INTO Classifies VALUES (1, 15);
INSERT INTO Classifies VALUES (1, 18);
INSERT INTO Classifies VALUES (1, 22);
INSERT INTO Classifies VALUES (1, 26);
INSERT INTO Classifies VALUES (2, 1);
INSERT INTO Classifies VALUES (2, 2);
INSERT INTO Classifies VALUES (2, 14);
INSERT INTO Classifies VALUES (2, 16);
INSERT INTO Classifies VALUES (2, 19);
INSERT INTO Classifies VALUES (2, 20);
INSERT INTO Classifies VALUES (2, 21);
INSERT INTO Classifies VALUES (2, 23);
INSERT INTO Classifies VALUES (2, 24);
INSERT INTO Classifies VALUES (3, 25);
INSERT INTO Classifies VALUES (3, 27);
INSERT INTO Classifies VALUES (3, 28);
INSERT INTO Classifies VALUES (3, 29);
INSERT INTO Classifies VALUES (3, 30);

CREATE TABLE Inventory (
    itemid integer,
    amt_available integer,
    available boolean default TRUE,
    PRIMARY KEY (itemid),
    FOREIGN KEY (itemid) REFERENCES fooditem on delete cascade
);

CREATE OR REPLACE FUNCTION inventory_check() 
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amt_available > 0 THEN
        NEW.available = TRUE;
    END IF;
    IF NEW.amt_available = 0 THEN
        NEW.available = FALSE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_check_trigger
    BEFORE INSERT OR UPDATE
    ON Inventory
    FOR EACH ROW
    EXECUTE FUNCTION inventory_check()
;

INSERT INTO Inventory VALUES (1, 0, DEFAULT);
INSERT INTO Inventory VALUES (2, 123, DEFAULT);
INSERT INTO Inventory VALUES (3, 90, DEFAULT);
INSERT INTO Inventory VALUES (4, 33, DEFAULT);
INSERT INTO Inventory VALUES (5, 197, DEFAULT);
INSERT INTO Inventory VALUES (6, 0, DEFAULT);
INSERT INTO Inventory VALUES (7, 13, DEFAULT);
INSERT INTO Inventory VALUES (8, 9, DEFAULT);
INSERT INTO Inventory VALUES (9, 33, DEFAULT);
INSERT INTO Inventory VALUES (10, 37, DEFAULT);
INSERT INTO Inventory VALUES (11, 0, DEFAULT);
INSERT INTO Inventory VALUES (12, 13, DEFAULT);
INSERT INTO Inventory VALUES (13, 9, DEFAULT);
INSERT INTO Inventory VALUES (14, 33, DEFAULT);
INSERT INTO Inventory VALUES (15, 37, DEFAULT);
INSERT INTO Inventory VALUES (16, 0, DEFAULT);
INSERT INTO Inventory VALUES (17, 13, DEFAULT);
INSERT INTO Inventory VALUES (18, 9, DEFAULT);
INSERT INTO Inventory VALUES (19, 33, DEFAULT);
INSERT INTO Inventory VALUES (20, 37, DEFAULT);
INSERT INTO Inventory VALUES (21, 0, DEFAULT);
INSERT INTO Inventory VALUES (22, 13, DEFAULT);
INSERT INTO Inventory VALUES (23, 9, DEFAULT);
INSERT INTO Inventory VALUES (24, 33, DEFAULT);
INSERT INTO Inventory VALUES (25, 37, DEFAULT);
INSERT INTO Inventory VALUES (26, 0, DEFAULT);
INSERT INTO Inventory VALUES (27, 13, DEFAULT);
INSERT INTO Inventory VALUES (28, 9, DEFAULT);
INSERT INTO Inventory VALUES (29, 33, DEFAULT);
INSERT INTO Inventory VALUES (30, 37, DEFAULT);

CREATE TABLE Staff (
    Id SERIAL,
    RestaurantId INTEGER not null,
    email VARCHAR(100) unique NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id, RestaurantId),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant on delete cascade
);

INSERT INTO Staff VALUES (DEFAULT, 1, 'seed1_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 1, 'seed2_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 1, 'seed3_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 1, 'seed4_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 1, 'seed5_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 2, 'seed6_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 2, 'seed7_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 2, 'seed8_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 2, 'seed9_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 3, 'seed10_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 3, 'seed11_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 3, 'seed12_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 3, 'seed13_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 4, 'seed14_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 4, 'seed15_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 4, 'seed16_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 4, 'seed17_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 4, 'seed18_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 5, 'seed19_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 5, 'seed20_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 5, 'seed21_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 5, 'seed22_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Staff VALUES (DEFAULT, 5, 'seed23_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');

CREATE TABLE Manager (
    Id SERIAL,
    email VARCHAR(100) unique NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id)
);

INSERT INTO Manager VALUES (DEFAULT, 'seed24_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Manager VALUES (DEFAULT, 'seed25_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Manager VALUES (DEFAULT, 'seed26_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Manager VALUES (DEFAULT, 'seed27_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Manager VALUES (DEFAULT, 'seed28_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Manager VALUES (DEFAULT, 'seed29_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');

CREATE TABLE Promotion (
    PromotionID SERIAL,
    MinSpending INTEGER default 0,
    PercentageOff INTEGER default 0,
    freedelivery boolean default false,
    DateEntered TIMESTAMP DEFAULT now(),
    StartDate TIMESTAMP NOT NULL,
    EndDate TIMESTAMP NOT NULL,
    PRIMARY KEY (PromotionID)
);

CREATE OR REPLACE FUNCTION promotion_date_check() 
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Startdate > NEW.endDate THEN
        RAISE EXCEPTION 'Start date cannot be after end date!';
    END IF;
    IF NEW.Startdate < NEW.DateEntered THEN
        RAISE EXCEPTION 'Start date cannot be before today!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER promotion_date_trigger
    BEFORE INSERT OR UPDATE
    ON Promotion
    FOR EACH ROW
    EXECUTE FUNCTION promotion_date_check()
;

INSERT INTO Promotion VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, 
    DEFAULT, now(), '2020-09-28 01:00:00');
INSERT INTO Promotion VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, 
    DEFAULT, now(), '2020-05-18 01:00:00');
    INSERT INTO Promotion VALUES (DEFAULT, DEFAULT, DEFAULT, DEFAULT, 
    DEFAULT, now(), '2021-05-08 01:00:00');


create table restaurantpromotion (
    promotionid integer unique references promotion on delete cascade,
    resid integer references restaurant on delete cascade,
    primary key (promotionid, resid)
);

INSERT INTO restaurantpromotion VALUES (1, 2);
INSERT INTO restaurantpromotion VALUES (2, 4);

create table fdspromotion (
    promotionid integer unique references promotion,
    managerid integer references Manager,
    primary key (promotionid, managerid)
);

INSERT INTO fdspromotion VALUES (3, 3);

CREATE TABLE Rider (
    Id SERIAL,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    PRIMARY KEY (Id)
);

INSERT INTO Rider VALUES (DEFAULT, 'seed30_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Rider VALUES (DEFAULT, 'seed31_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Rider VALUES (DEFAULT, 'seed32_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');
INSERT INTO Rider VALUES (DEFAULT, 'seed33_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword');

CREATE TABLE PartTime (
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

INSERT INTO PartTime VALUES (1);
INSERT INTO PartTime VALUES (2);

CREATE TABLE FullTime (
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

INSERT INTO FullTime VALUES (3);
INSERT INTO FullTime VALUES (4);

CREATE TABLE Shifts (
    Id INTEGER,
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    PRIMARY KEY (Id, StartTime, EndTime),
    FOREIGN KEY (Id) REFERENCES Rider ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION shift_check() 
    RETURNS TRIGGER AS $$
BEGIN
   IF ((select count(*) FROM Shifts GROUP BY StartTime limit 1) < 5) THEN
        RAISE INFO 'There are less than five people working this shift';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER shift_check_trigger
    AFTER INSERT
    ON Shifts
    FOR EACH ROW
    EXECUTE FUNCTION shift_check()
;

INSERT INTO Shifts VALUES (1, '2020-05-22 10:00:00', '2020-05-22 12:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-23 13:00:00', '2020-05-23 15:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-24 13:00:00', '2020-05-24 15:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-25 16:00:00', '2020-05-25 18:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-26 10:00:00', '2020-05-26 12:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-27 13:00:00', '2020-05-27 15:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-28 13:00:00', '2020-05-28 15:00:00');
INSERT INTO Shifts VALUES (1, '2020-05-28 16:00:00', '2020-05-29 18:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-22 10:00:00', '2020-05-22 12:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-23 13:00:00', '2020-05-23 15:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-24 13:00:00', '2020-05-24 15:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-25 16:00:00', '2020-05-25 18:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-26 10:00:00', '2020-05-26 12:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-27 13:00:00', '2020-05-27 15:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-28 13:00:00', '2020-05-28 15:00:00');
INSERT INTO Shifts VALUES (2, '2020-05-28 16:00:00', '2020-05-29 18:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-26 13:00:00', '2020-05-26 17:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-26 18:00:00', '2020-05-26 22:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-27 13:00:00', '2020-05-27 17:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-27 18:00:00', '2020-05-27 22:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-28 10:00:00', '2020-05-28 14:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-28 15:00:00', '2020-05-28 19:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-29 11:00:00', '2020-05-29 15:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-29 16:00:00', '2020-05-29 20:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-30 12:00:00', '2020-05-30 16:00:00');
INSERT INTO Shifts VALUES (3, '2020-05-30 17:00:00', '2020-05-30 21:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-26 13:00:00', '2020-05-26 17:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-26 18:00:00', '2020-05-26 22:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-27 13:00:00', '2020-05-27 17:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-27 18:00:00', '2020-05-27 22:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-28 10:00:00', '2020-05-28 14:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-28 15:00:00', '2020-05-28 19:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-29 11:00:00', '2020-05-29 15:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-29 16:00:00', '2020-05-29 20:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-30 12:00:00', '2020-05-30 16:00:00');
INSERT INTO Shifts VALUES (4, '2020-05-30 17:00:00', '2020-05-30 21:00:00');

CREATE TABLE Customer (
    Id SERIAL,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    Points INTEGER default 0,
    CCID INTEGER,
    joined_at timestamp default now(),
    PRIMARY KEY (Id)
);

INSERT INTO Customer VALUES (DEFAULT, 'seed34_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, NULL, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed35_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, 333, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed36_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, 157, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed37_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, 256, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed38_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, 887, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed39_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, 990, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed40_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, NULL, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed41_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, NULL, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed42_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, NULL, DEFAULT);
INSERT INTO Customer VALUES (DEFAULT, 'seed43_email@gmail.com', 'seed_first_name', 'seed_second_name', 'thisisapassword', DEFAULT, NULL, DEFAULT);

CREATE TABLE Orders (
    OrderID SERIAL,
    ordered_on timestamp default now(),
    Id INTEGER REFERENCES Customer on delete set null, 
    ccpayment boolean, 
    PRIMARY KEY (OrderID)
);

INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 1, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 1, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 2, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 3, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 4, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 5, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 6, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 6, TRUE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 7, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 8, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 9, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);
INSERT INTO Orders VALUES (DEFAULT, DEFAULT, 10, FALSE);

CREATE TABLE OrderDetails (
    OrderID integer,
    AddressDetails VARCHAR(60) NOT NULL,
    PRIMARY KEY (OrderID),
    foreign key (orderid) references orders
);

INSERT INTO OrderDetails VALUES (1, 'address_1');
INSERT INTO OrderDetails VALUES (2, 'address_2');
INSERT INTO OrderDetails VALUES (3, 'address_3');
INSERT INTO OrderDetails VALUES (4, 'address_4');
INSERT INTO OrderDetails VALUES (5, 'address_5');
INSERT INTO OrderDetails VALUES (6, 'address_6');
INSERT INTO OrderDetails VALUES (7, 'address_7');
INSERT INTO OrderDetails VALUES (8, 'address_8');
INSERT INTO OrderDetails VALUES (9, 'address_9');
INSERT INTO OrderDetails VALUES (10, 'address_10');
INSERT INTO OrderDetails VALUES (11, 'address_10');
INSERT INTO OrderDetails VALUES (12, 'address_12');
INSERT INTO OrderDetails VALUES (13, 'address_12');
INSERT INTO OrderDetails VALUES (14, 'address_12');
INSERT INTO OrderDetails VALUES (15, 'address_12');
INSERT INTO OrderDetails VALUES (16, 'address_12');
INSERT INTO OrderDetails VALUES (17, 'address_13');
--cust 10 has 6 address entries, entries should show top 5

CREATE TABLE Contains (
    orderid integer,
    ItemID INTEGER,
    Quantity INTEGER,
    Cost INTEGER REFERENCES FoodItem,
    FoodFee INTEGER,
    PRIMARY KEY (orderid, ItemID),
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete set null, 
    foreign key (orderid) references orders
);

CREATE OR REPLACE FUNCTION contains_check() 
    RETURNS TRIGGER AS $$
BEGIN
    NEW.FoodFee = NEW.Quantity*NEW.Cost;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contains_check_trigger
    BEFORE INSERT OR UPDATE
    ON Contains 
    FOR EACH ROW
    EXECUTE FUNCTION contains_check()
;

INSERT INTO Contains VALUES (1, 2, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (1, 1, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (1, 3, 3, 5, DEFAULT);
INSERT INTO Contains VALUES (2, 10, 7, 2, DEFAULT);
INSERT INTO Contains VALUES (2, 11, 11, 1, DEFAULT);
INSERT INTO Contains VALUES (3, 23, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (4, 25, 3, 8, DEFAULT);
INSERT INTO Contains VALUES (4, 29, 3, 13, DEFAULT);
INSERT INTO Contains VALUES (4, 26, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (5, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (6, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (7, 25, 3, 8, DEFAULT);
INSERT INTO Contains VALUES (7, 29, 3, 13, DEFAULT);
INSERT INTO Contains VALUES (7, 26, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (8, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (9, 10, 7, 2, DEFAULT);
INSERT INTO Contains VALUES (9, 11, 11, 1, DEFAULT);
INSERT INTO Contains VALUES (10, 23, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (11, 25, 3, 8, DEFAULT);
INSERT INTO Contains VALUES (11, 29, 3, 13, DEFAULT);
INSERT INTO Contains VALUES (11, 26, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (12, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (13, 25, 3, 8, DEFAULT);
INSERT INTO Contains VALUES (13, 29, 3, 13, DEFAULT);
INSERT INTO Contains VALUES (13, 26, 1, 5, DEFAULT);
INSERT INTO Contains VALUES (14, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (15, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (16, 1, 2, 5, DEFAULT);
INSERT INTO Contains VALUES (17, 1, 2, 5, DEFAULT);

CREATE TABLE Delivers (
    OrderID INTEGER,
    Id INTEGER,
    DeliveryFee INTEGER,
    PRIMARY KEY (OrderID), 
    FOREIGN KEY (OrderID) REFERENCES OrderDetails,
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

CREATE TABLE Journey (
    orderid integer,
    OrderedOn TIMESTAMP NOT NULL,
    RiderStartsJourney TIMESTAMP NOT NULL,
    RiderArrivesAtRes TIMESTAMP NOT NULL,
    RiderDepartsToCust TIMESTAMP NOT NULL,
    DeliversFood TIMESTAMP NOT NULL,
    PRIMARY KEY (orderid),
    foreign key (orderid) references orders
);

---salary stores numbers only, only computed in query
CREATE TABLE Salary (
    Id INTEGER,
    TotalJourney INTEGER DEFAULT 0,
    Comission INTEGER,
    BaseSalary INTEGER,
    StartDate TIMESTAMP,
    EndDate TIMESTAMP,
    TotalSalary INTEGER DEFAULT 0,
    PRIMARY KEY (Id, StartDate, EndDate),
    FOREIGN KEY (Id) REFERENCES Rider ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION salary_update() 
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE Salary S
        SET TotalJourney = S.TotalJourney + 1, 
            TotalSalary = S.BaseSalary + ((S.TotalJourney + 1)*S.Comission)
        WHERE Id = NEW.Id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER salary_update_trigger
    AFTER INSERT
    ON Delivers
    FOR EACH ROW
    EXECUTE FUNCTION salary_update()
;

INSERT INTO Salary VALUES (1, DEFAULT, 5, 100, '2020-05-01 10:05:00', '2020-05-31 10:05:00', DEFAULT);
INSERT INTO Salary VALUES (2, DEFAULT, 5, 100, '2020-05-01 10:05:00', '2020-05-31 10:05:00', DEFAULT);
INSERT INTO Salary VALUES (3, DEFAULT, 6, 450, '2020-05-01 10:05:00', '2020-05-31 10:05:00', DEFAULT);
INSERT INTO Salary VALUES (4, DEFAULT, 6, 450, '2020-05-01 10:05:00', '2020-05-31 10:05:00', DEFAULT);

INSERT INTO Delivers VALUES (1, 1, 4);
INSERT INTO Delivers VALUES (2, 1, 4);
INSERT INTO Delivers VALUES (3, 1, 4);
INSERT INTO Delivers VALUES (4, 1, 4);
INSERT INTO Delivers VALUES (5, 1, 4);
INSERT INTO Delivers VALUES (6, 2, 4);
INSERT INTO Delivers VALUES (7, 2, 4);
INSERT INTO Delivers VALUES (8, 2, 4);
INSERT INTO Delivers VALUES (9, 2, 4);
INSERT INTO Delivers VALUES (10, 3, 4);
INSERT INTO Delivers VALUES (11, 3, 4);
INSERT INTO Delivers VALUES (12, 3, 4);
INSERT INTO Delivers VALUES (13, 3, 4);
INSERT INTO Delivers VALUES (14, 4, 4);
INSERT INTO Delivers VALUES (15, 4, 4);
INSERT INTO Delivers VALUES (16, 4, 4);
INSERT INTO Delivers VALUES (17, 4, 4);

--rider 1 delivers
INSERT INTO Journey VALUES (1, '2020-05-22 10:05:00', '2020-05-22 10:10:00', '2020-05-22 10:15:00', '2020-05-22 10:20:00', '2020-05-22 10:25:00');
INSERT INTO Journey VALUES (2, '2020-05-22 10:27:00', '2020-05-22 10:30:00', '2020-05-22 10:35:00', '2020-05-22 10:40:00', '2020-05-22 10:45:00');
INSERT INTO Journey VALUES (3, '2020-05-23 13:05:00', '2020-05-23 13:10:00', '2020-05-23 13:20:00', '2020-05-23 13:30:00', '2020-05-23 13:40:00');
INSERT INTO Journey VALUES (4, '2020-05-23 14:05:00', '2020-05-23 14:10:00', '2020-05-23 14:20:00', '2020-05-23 14:30:00', '2020-05-23 14:40:00');
INSERT INTO Journey VALUES (5, '2020-05-25 16:05:00', '2020-05-25 16:10:00', '2020-05-25 16:20:00', '2020-05-25 16:30:00', '2020-05-25 16:40:00');
--rider 2 delivers
INSERT INTO Journey VALUES (6, '2020-05-23 13:05:00', '2020-05-23 13:10:00', '2020-05-23 13:20:00', '2020-05-23 13:30:00', '2020-05-23 13:40:00');
INSERT INTO Journey VALUES (7, '2020-05-23 13:45:00', '2020-05-23 13:50:00', '2020-05-23 14:10:00', '2020-05-23 14:20:00', '2020-05-23 14:30:00');
INSERT INTO Journey VALUES (8, '2020-05-25 16:05:00', '2020-05-25 16:10:00', '2020-05-25 16:20:00', '2020-05-25 16:30:00', '2020-05-25 16:40:00');
INSERT INTO Journey VALUES (9, '2020-05-25 17:05:00', '2020-05-25 17:10:00', '2020-05-25 17:20:00', '2020-05-25 17:30:00', '2020-05-25 17:40:00');
--rider 3 delivers
INSERT INTO Journey VALUES (10, '2020-05-26 13:05:00', '2020-05-26 13:10:00', '2020-05-26 13:20:00', '2020-05-26 13:30:00', '2020-05-26 13:40:00');
INSERT INTO Journey VALUES (11, '2020-05-26 15:05:00', '2020-05-26 15:10:00', '2020-05-26 15:20:00', '2020-05-26 15:30:00', '2020-05-26 15:40:00');
INSERT INTO Journey VALUES (12, '2020-05-27 13:05:00', '2020-05-27 13:10:00', '2020-05-27 13:20:00', '2020-05-27 13:30:00', '2020-05-27 13:40:00');
INSERT INTO Journey VALUES (13, '2020-05-28 10:05:00', '2020-05-28 10:10:00', '2020-05-28 10:20:00', '2020-05-28 10:30:00', '2020-05-28 10:40:00');
--rider 4 delivers
INSERT INTO Journey VALUES (14, '2020-05-26 13:05:00', '2020-05-26 13:10:00', '2020-05-26 13:20:00', '2020-05-26 13:30:00', '2020-05-26 13:40:00');
INSERT INTO Journey VALUES (15, '2020-05-27 18:05:00', '2020-05-27 18:10:00', '2020-05-27 18:20:00', '2020-05-27 18:30:00', '2020-05-27 18:40:00');
INSERT INTO Journey VALUES (16, '2020-05-29 11:05:00', '2020-05-29 11:10:00', '2020-05-29 11:20:00', '2020-05-29 11:30:00', '2020-05-29 11:40:00');
INSERT INTO Journey VALUES (17, '2020-05-30 12:05:00', '2020-05-30 12:10:00', '2020-05-30 12:20:00', '2020-05-30 12:30:00', '2020-05-30 12:40:00');

CREATE TABLE Receipt (
    orderid integer,
    promotionid INTEGER,
    PercentageOff INTEGER DEFAULT 0,
    GainedPoints INTEGER, 
    UsedPoints INTEGER,
    DeliveryFee INTEGER,
    FoodFee INTEGER,
    TotalFee NUMERIC,
    PRIMARY KEY (orderid),
    foreign key (orderid) references orders
);

CREATE OR REPLACE FUNCTION receipt_check() 
    RETURNS TRIGGER AS $$
BEGIN
    NEW.TotalFee = Round(((NEW.DeliveryFee + NEW.FoodFee) * ((100 - NEW.PercentageOff)/100.0)), 2);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER receipt_check_trigger
    BEFORE INSERT OR UPDATE
    ON Receipt 
    FOR EACH ROW
    EXECUTE FUNCTION receipt_check()
;

INSERT INTO Receipt VALUES (1, NULL, 10, 10, NULL, 4, 25, DEFAULT);
INSERT INTO Receipt VALUES (2, NULL, 30, 10, NULL, 4, 25, DEFAULT);
INSERT INTO Receipt VALUES (3, NULL, 20, 10, NULL, 4, 5, DEFAULT);
INSERT INTO Receipt VALUES (4, NULL, 50, 10, NULL, 4, 68, DEFAULT);
INSERT INTO Receipt VALUES (5, NULL, 10, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (6, NULL, 30, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (7, NULL, 20, 10, NULL, 4, 68, DEFAULT);
INSERT INTO Receipt VALUES (8, NULL, DEFAULT, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (9, NULL, 10, 10, NULL, 4, 25, DEFAULT);
INSERT INTO Receipt VALUES (10, NULL, 10, 10, NULL, 4, 5, DEFAULT);
INSERT INTO Receipt VALUES (11, NULL, DEFAULT, 10, NULL, 4, 68, DEFAULT);
INSERT INTO Receipt VALUES (12, NULL, 10, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (13, NULL, DEFAULT, 10, NULL, 4, 68, DEFAULT);
INSERT INTO Receipt VALUES (14, NULL, DEFAULT, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (15, NULL, 30, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (16, NULL, DEFAULT, 10, NULL, 4, 10, DEFAULT);
INSERT INTO Receipt VALUES (17, NULL, 50, 10, NULL, 4, 10, DEFAULT);

--rating for RIDERS
CREATE TABLE Rates (
    OrderID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (OrderID) REFERENCES Delivers 
);

INSERT INTO Rates VALUES (1, 2);
INSERT INTO Rates VALUES (2, 5);
INSERT INTO Rates VALUES (3, 5);
INSERT INTO Rates VALUES (4, 4);
INSERT INTO Rates VALUES (6, 3);
INSERT INTO Rates VALUES (7, 2);
INSERT INTO Rates VALUES (8, 1);
INSERT INTO Rates VALUES (11, 5);
INSERT INTO Rates VALUES (12, 4);
INSERT INTO Rates VALUES (14, 2);
INSERT INTO Rates VALUES (16, 5);
INSERT INTO Rates VALUES (17, 4);

--review FOOD
CREATE TABLE Reviews (
    orderid integer,
    ItemID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    Review VARCHAR(200),
    PRIMARY KEY (orderid, ItemID),
    foreign key (orderid) references orders, 
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete set null
);

INSERT INTO Reviews VALUES (1, 2, 5, 'Amazing');
INSERT INTO Reviews VALUES (2, 10, 4, 'Amazing');
INSERT INTO Reviews VALUES (3, 23, 3, 'Amazing');
INSERT INTO Reviews VALUES (4, 29, 2, 'Amazingly mediocre');
INSERT INTO Reviews VALUES (6, 1, 3, 'Amazing');
INSERT INTO Reviews VALUES (7, 25, 0, 'AmazingLY BAD');
INSERT INTO Reviews VALUES (8, 1, 1, 'AmazingLY BAD');
INSERT INTO Reviews VALUES (11, 25, 3, 'Amazing');
INSERT INTO Reviews VALUES (12, 1, 3, 'Amazing');
INSERT INTO Reviews VALUES (14, 1, 5, 'Amazing');
INSERT INTO Reviews VALUES (16, 1, 4, 'Amazing');
INSERT INTO Reviews VALUES (17, 1, 4, 'Amazing');
