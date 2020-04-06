drop table if exists FoodItem cascade;
drop table if exists Menu cascade;
drop table if exists Listings cascade; 
drop table if exists Category cascade; 
drop table if exists LocalFood cascade; 
drop table if exists WesternFood cascade; 
drop table if exists Classifies cascade; 
drop table if exists Restaurant cascade; 
drop table if exists Inventory cascade; 
drop table if exists Promotion cascade; 
drop table if exists Discounts cascade; 
drop table if exists Rider cascade; 
drop table if exists PartTime cascade; 
drop table if exists FullTime cascade; 
drop table if exists Works cascade; 
drop table if exists Shift cascade; 
drop table if exists CreditCard cascade; 
drop table if exists Customer cascade; 
drop table if exists Uses cascade; 
drop table if exists Order cascade; 
drop table if exists Contains cascade; 
drop table if exists Journey cascade; 
drop table if exists Delivers cascade; 
drop table if exists Receipt cascade; 
drop table if exists Orders cascade; 
drop table if exists Rates cascade; 
drop table if exists Manager cascade;
drop table if exists Staff cascade;


CREATE TABLE FoodItem (
    ItemID serial,
    Available INTEGER,
    Cost INTEGER,
    MaxLimit INTEGER,
    PRIMARY KEY (ItemID)
);

CREATE TABLE Menu (
    MenuID serial,
    PRIMARY KEY (MenuID)
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

CREATE TABLE LocalFood (
    CategoryName VARCHAR(20),
    PRIMARY KEY (CategoryName),
    FOREIGN KEY (CategoryName) REFERENCES Category
);

CREATE TABLE WesternFood (
    CategoryName VARCHAR(20),
    PRIMARY KEY (CategoryName),
    FOREIGN KEY (CategoryName) REFERENCES Category
);

CREATE TABLE Classifies (
    CategoryName VARCHAR(20),
    ItemID INTEGER,
    PRIMARY KEY (CategoryName, ItemID),
    FOREIGN KEY (CategoryName) REFERENCES Category,
    FOREIGN KEY (ItemID) REFERENCES FoodItem
);

CREATE TABLE Restaurant (
    ResID serial,
    MinSpending INTEGER,
    AddressDetails VARCHAR(60),
    PRIMARY KEY (ResID)
);

CREATE TABLE Inventory (
    ResID INTEGER,
    MenuID INTEGER,
    PRIMARY KEY (ResID, MenuID),
    FOREIGN KEY (ResID) REFERENCES Restaurant,
    FOREIGN KEY (MenuID) REFERENCES Menu
);

CREATE TABLE Promotion (
    PromotionID serial,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Discounts (
    PromotionID serial,
    MinSpending INTEGER,
    PercentageOff INTEGER,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Rider (
    RiderID serial,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    PRIMARY KEY (RiderID)
);

--- MISSING WW/ MW DETAILS
CREATE TABLE PartTime (
    RiderID INTEGER,
    PRIMARY KEY (RiderID),
    FOREIGN KEY (RiderID) REFERENCES Rider
);

CREATE TABLE FullTime (
    RiderID INTEGER,
    PRIMARY KEY (WW),
    FOREIGN KEY (RiderID) REFERENCES Rider
);
---

CREATE TABLE Works (
    RiderID INTEGER,
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    PRIMARY KEY (RiderID, StartTime, EndTime),
    FOREIGN KEY (RiderID) REFERENCES Rider,
    FOREIGN KEY (StartTime, EndTime) REFERENCES Shift
);

CREATE TABLE Shift (
    StartTime TIMESTAMP,
    EndTime TIMESTAMP,
    PRIMARY KEY (StartTime, EndTime)
);

CREATE TABLE CreditCard (
    CCID serial NOT NULL,
    SecurityCode INTEGER NOT NULL,
    Bank VARCHAR(20) NOT NULL,
    PRIMARY KEY (CCID)
);

CREATE TABLE Customer (
    CustomerID serial,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    Points INTEGER default 0,
    CCID INTEGER,
    PRIMARY KEY (CustomerID),
    FOREIGN KEY (CCID) REFERENCES CreditCard
);

CREATE TABLE Uses (
    CustomerID INTEGER,
    CCID INTEGER,
    PRIMARY KEY (CUstomerID, CCID),
    FOREIGN KEY (CustomerID) REFERENCES Customer,
    FOREIGN KEY (CCID) REFERENCES CreditCard
);

CREATE TABLE Order (
    OrderID serial,
    AddressDetails VARCHAR(60) NOT NULL,
    PRIMARY KEY (OrderID),
);

CREATE TABLE Rating (
    Comment VARCHAR(100)
);

CREATE TABLE Orders (
    CustomerID INTEGER,
    OrderID INTEGER,
    PRIMARY KEY (CustomerID, OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customer,
    FOREIGN KEY (OrderID) REFERENCES Order
);

CREATE TABLE Contains (
    ItemID INTEGER,
    Quantity INTEGER,
    FoodFee INTEGER,
    PRIMARY KEY (ItemID, Quantity),
    FOREIGN KEY (ItemID) REFERENCES FoodItem,
    CHECK (
        Quantity > 0 and Quantity <= Available
    )
);

CREATE TABLE Journey (
    JourneyID serial,
    OrderedOn TIMESTAMP NOT NULL,
    RiderStartsJourney TIMESTAMP NOT NULL,
    RiderArrivesAtRes TIMESTAMP NOT NULL,
    RiderDepartsToCust TIMESTAMP NOT NULL,
    DeliversFood TIMESTAMP NOT NULL,
    PRIMARY KEY (JourneyID)
);

CREATE TABLE Delivers (
    OrderID INTEGER,
    RiderID INTEGER,
    JourneyID INTEGER REFERENCES Journey,
    DeliveryFee INTEGER,
    PRIMARY KEY (OrderID, RiderID),
    FOREIGN KEY (OrderID) REFERENCES Order,
    FOREIGN KEY (RiderID) REFERENCES Rider
);

CREATE TABLE Contains (
    ItemID INTEGER,
    Quantity INTEGER NOT NULL,
    FoodFee INTEGER,
    PRIMARY KEY (ItemID),
    FOREIGN KEY (ItemID) REFERENCES FoodItem
);

CREATE TABLE Receipt (
    ReceiptID serial,
    GainedPoints INTEGER,
    UsedPoints INTEGER,
    DeliveryFee INTEGER,
    FoodFee INTEGER,
    TotalFee INTEGER,
    PRIMARY KEY (ReceiptID)
);

CREATE TABLE Orders (
    OrderID serial,
    ReceiptID INTEGER REFERENCES Receipt,
    CustomerID INTEGER REFERENCES Customer,
    PRIMARY KEY (OrderID),
    -- FOREIGN KEY (OrderID) REFERENCES Order (omo idk but i just comment out cos we dont have Order table)
);

CREATE TABLE Rates (
    CustomerID INTEGER,
    OrderID INTEGER,
    Comment VARCHAR(100),
    PRIMARY KEY (CustomerID, OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customer,
    FOREIGN KEY (OrderID) REFERENCES Order
);

create table Staff (
    StaffID serial primary key,
    RestaurantId INTEGER,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    primary key (StaffID, RestaurandID),
    foreign key (RestaurantID) REFERENCES Restaurants
);

create table Manager (
    ManagerID serial primary key,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null
);