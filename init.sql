CREATE TABLE FoodItem (
    ItemID INTEGER,
    Available INTEGER,
    Cost INTEGER,
    MaxLimit INTEGER,
    PRIMARY KEY (ItemID)
);

CREATE TABLE Menu (
    MenuID INTEGER,
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
    ResID INTEGER,
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
    PromotionID INTEGER,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Discounts (
    PromotionID INTEGER,
    MinSpending INTEGER,
    PercentageOff INTEGER,
    PRIMARY KEY (PromotionID)
);

CREATE TABLE Rider (
    RiderID INTEGER,
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
    CCID INTEGER NOT NULL,
    SecurityCode INTEGER NOT NULL,
    Bank VARCHAR(20) NOT NULL,
    PRIMARY KEY (CCID)
);

CREATE TABLE Customer (
    CustomerID INTEGER,
    Points INTEGER,
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
    OrderID INTEGER,
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
    JourneyID INTEGER,
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
    ReceiptID INTEGER,
    GainedPoints INTEGER,
    UsedPoints INTEGER,
    DeliveryFee INTEGER,
    FoodFee INTEGER,
    TotalFee INTEGER,
    PRIMARY KEY (ReceiptID)
);

CREATE TABLE Orders (
    OrderID INTEGER,
    ReceiptID INTEGER REFERENCES Receipt,
    CustomerID INTEGER REFERENCES Customer,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (OrderID) REFERENCES Order
);

CREATE TABLE Rates (
    CustomerID INTEGER,
    OrderID INTEGER,
    Comment VARCHAR(100),
    PRIMARY KEY (CustomerID, OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customer,
    FOREIGN KEY (OrderID) REFERENCES Order
);