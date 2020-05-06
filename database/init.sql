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

CREATE TABLE Orders (
    OrderID SERIAL,
    ordered_on timestamp default now(),
    Id INTEGER REFERENCES Customer on delete set null, 
    ccpayment boolean, 
    PRIMARY KEY (OrderID)
);

CREATE TABLE OrderDetails (
    OrderID integer,
    AddressDetails VARCHAR(60) NOT NULL,
    PRIMARY KEY (OrderID),
    foreign key (orderid) references orders
);

CREATE TABLE Contains (
    orderid integer,
    ItemID INTEGER,
    Quantity INTEGER,
    FoodFee INTEGER,
    PRIMARY KEY (orderid, ItemID),
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete set null, 
    foreign key (orderid) references orders
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

CREATE TABLE Delivers (
    OrderID INTEGER,
    Id INTEGER,
    DeliveryFee INTEGER,
    PRIMARY KEY (OrderID), 
    FOREIGN KEY (OrderID) REFERENCES OrderDetails,
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

CREATE TABLE Receipt (
    orderid integer,
    promotionid INTEGER,
    GainedPoints INTEGER, 
    UsedPoints INTEGER,
    DeliveryFee INTEGER,
    FoodFee INTEGER,
    TotalFee INTEGER,
    PRIMARY KEY (orderid),
    foreign key (orderid) references orders
);

CREATE TABLE Rates (
    OrderID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    PRIMARY KEY (OrderID),
    FOREIGN KEY (OrderID) REFERENCES Delivers 
);

CREATE TABLE Reviews (
    orderid integer,
    ItemID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    Review VARCHAR(200),
    PRIMARY KEY (orderid, ItemID),
    foreign key (orderid) references orders, 
    FOREIGN KEY (ItemID) REFERENCES FoodItem on delete set null
);

---salary stores numbers only, only computed in query
CREATE TABLE Salary (
    Id INTEGER,
    Comission INTEGER,
    BaseSalary INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider ON DELETE CASCADE
);