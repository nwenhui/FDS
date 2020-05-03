DROP TABLE IF EXISTS FoodItem CASCADE;
DROP TABLE IF EXISTS Menu CASCADE;
DROP TABLE IF EXISTS Restaurant CASCADE;
DROP TABLE IF EXISTS Listings CASCADE;
DROP TABLE IF EXISTS Category CASCADE;
DROP TABLE IF EXISTS Classifies CASCADE;
DROP TABLE IF EXISTS Inventory CASCADE;
DROP TABLE IF EXISTS Promotion CASCADE;
DROP TABLE IF EXISTS Discounts CASCADE;
DROP TABLE IF EXISTS Rider CASCADE;
DROP TABLE IF EXISTS PartTime CASCADE;
DROP TABLE IF EXISTS FullTime CASCADE;
DROP TABLE IF EXISTS Works CASCADE;
DROP TABLE IF EXISTS CreditCard CASCADE;
DROP TABLE IF EXISTS Customer CASCADE;
DROP TABLE IF EXISTS PaysWith CASCADE;
DROP TABLE IF EXISTS OrderDetails CASCADE;
DROP TABLE IF EXISTS Contains CASCADE;
DROP TABLE IF EXISTS Journey CASCADE;
DROP TABLE IF EXISTS Delivers CASCADE;
DROP TABLE IF EXISTS Receipt CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Rates CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Staff CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;

CREATE TABLE FoodItem (
    ItemID SERIAL,
    Cost INTEGER,
    MaxLimit INTEGER,
    Available INTEGER CHECK (Available <= MaxLimit),
    PRIMARY KEY (ItemID)
);

CREATE TABLE Menu (
    MenuID SERIAL,
    PRIMARY KEY (MenuID)
);

CREATE TABLE Restaurant (
    ResID SERIAL,
    ResName VARCHAR(100) unique,
    MinSpending INTEGER,
    PRIMARY KEY (ResID)
);

CREATE TABLE Listings (
    ResID INTEGER,
    ItemID INTEGER,
    PRIMARY KEY (ResID, ItemID),
    FOREIGN KEY (ResID) REFERENCES Restaurant,
    FOREIGN KEY (ItemID) REFERENCES FoodItem
);

CREATE TABLE Category (
    CategoryName VARCHAR(20),
    PRIMARY KEY (CategoryName)
);

CREATE TABLE Classifies (
    CategoryName VARCHAR(20),
    ItemID INTEGER,
    PRIMARY KEY (CategoryName, ItemID),
    FOREIGN KEY (CategoryName) REFERENCES Category,
    FOREIGN KEY (ItemID) REFERENCES FoodItem
);

CREATE TABLE Inventory (
    ResID INTEGER,
    MenuID INTEGER,
    PRIMARY KEY (ResID, MenuID),
    FOREIGN KEY (ResID) REFERENCES Restaurant,
    FOREIGN KEY (MenuID) REFERENCES Menu
);

CREATE TABLE Promotion (
    PromotionID SERIAL,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Discounts (
    PromotionID INTEGER,
    MinSpending INTEGER,
    PercentageOff INTEGER,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Rider (
    Id SERIAL,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    PRIMARY KEY (Id)
);

CREATE TABLE PartTime (
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

CREATE TABLE FullTime (
    Id INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

CREATE TABLE Works (
    Id INTEGER,
    StartTime TIMESTAMP NOT NULL,
    EndTime TIMESTAMP NOT NULL,
    TotalHours INTEGER NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (Id) REFERENCES Rider on delete cascade
);

CREATE TABLE CreditCard (
    CCID SERIAL,
    SecurityCode INTEGER NOT NULL,
    Bank VARCHAR(20) NOT NULL,
    PRIMARY KEY (CCID)
);

CREATE TABLE Customer (
    Id SERIAL,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    Points INTEGER default 0,
    CCID INTEGER,
    PRIMARY KEY (Id),
    FOREIGN KEY (CCID) REFERENCES CreditCard
);

CREATE TABLE PaysWith (
    Id INTEGER,
    CCID INTEGER,
    PRIMARY KEY (Id, CCID),
    FOREIGN KEY (Id) REFERENCES Customer,
    FOREIGN KEY (CCID) REFERENCES CreditCard
);

CREATE TABLE OrderDetails (
    OrderID SERIAL,
    AddressDetails VARCHAR(60) NOT NULL,
    PRIMARY KEY (OrderID)
);

CREATE TABLE Contains (
    ItemID INTEGER,
    Quantity INTEGER,
    FoodFee INTEGER,
    PRIMARY KEY (ItemID, Quantity),
    FOREIGN KEY (ItemID) REFERENCES FoodItem
);

CREATE TABLE Journey (
    JourneyID SERIAL,
    OrderedOn TIMESTAMP NOT NULL,
    RiderStartsJourney TIMESTAMP NOT NULL,
    RiderArrivesAtRes TIMESTAMP NOT NULL,
    RiderDepartsToCust TIMESTAMP NOT NULL,
    DeliversFood TIMESTAMP NOT NULL,
    PRIMARY KEY (JourneyID)
);

CREATE TABLE Delivers (
    OrderID INTEGER,
    Id INTEGER,
    JourneyID INTEGER REFERENCES Journey,
    DeliveryFee INTEGER,
    PRIMARY KEY (OrderID, Id),
    FOREIGN KEY (OrderID) REFERENCES OrderDetails,
    FOREIGN KEY (Id) REFERENCES Rider
);

CREATE TABLE Receipt (
    ReceiptID SERIAL,
    GainedPoints INTEGER,
    UsedPoints INTEGER,
    DeliveryFee INTEGER,
    FoodFee INTEGER,
    TotalFee INTEGER,
    PRIMARY KEY (ReceiptID)
);

CREATE TABLE Orders (
    OrderID SERIAL,
    ReceiptID INTEGER REFERENCES Receipt,
    Id INTEGER REFERENCES Customer,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (OrderID) REFERENCES OrderDetails
);

CREATE TABLE Rates (
    Id INTEGER,
    OrderID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    PRIMARY KEY (Id, OrderID),
    FOREIGN KEY (Id) REFERENCES Customer,
    FOREIGN KEY (OrderID) REFERENCES OrderDetails
);

CREATE TABLE Reviews (
    Id INTEGER,
    ItemID INTEGER,
    Rating INTEGER CHECK ((Rating >= 0) and (Rating <= 5)),
    Review VARCHAR(200),
    PRIMARY KEY (Id, ItemID),
    FOREIGN KEY (Id) REFERENCES Customer,
    FOREIGN KEY (ItemID) REFERENCES FoodItem 
);

CREATE TABLE Staff (
    Id SERIAL,
    RestaurantId INTEGER not null,
    email VARCHAR(100) unique NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id, RestaurantId),
    FOREIGN KEY (RestaurantID) REFERENCES Restaurant
);

CREATE TABLE Manager (
    Id SERIAL,
    email VARCHAR(100) unique NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (Id)
);