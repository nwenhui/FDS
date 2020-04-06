drop table if exists Customer cascade;
drop table if exists Restaurants cascade;
drop table if exists Staff cascade;
drop table if exists Rider cascade;
drop table if exists Manager cascade;

-- list of customer details & login
create table Customer (
    CustomerID serial,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    Points INTEGER default 0,
    CCID INTEGER default 0,
    PRIMARY KEY (CustomerID)
    -- FOREIGN KEY (CCID) REFERENCES CreditCard
);

CREATE TABLE Rider (
    RiderID serial,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    PRIMARY KEY (RiderID)
);

CREATE TABLE Restaurants (
    ResID serial,
    name varchar(100),
    MinSpending INTEGER,
    AddressDetails VARCHAR(60),
    PRIMARY KEY (ResID)
);

create table Staff (
    StaffID serial,
    RestaurantId INTEGER default 0,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    primary key (StaffID, RestaurantID)
    -- foreign key (RestaurantID) REFERENCES Restaurants
);

create table Manager (
    ManagerID serial primary key,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null
);

-- -- list of restaurant details
-- create table Restaurants (
--     rid serial,
--     name varchar(100),
--     primary key (rid)
-- );

-- -- list of restaurant staff details and login
-- create table Staff (
--     sid serial,
--     rid int,
--     name varchar(100),
--     email varchar(100),
--     password varchar(10),
--     primary key (sid, rid)
-- );

-- -- list of delivery riders details and login
-- create table Riders (
--     ridid serial,
--     name varchar(100),
--     email varchar(100),
--     password varchar(10),
--     primary key (ridid)
-- );

-- -- list of fds managers details and login
-- create table FDS (
--     fdsid serial,
--     name varchar(100),
--     email varchar(100),
--     password varchar(10),
--     primary key (fdsid)
-- );

-- insert into Customers(name, email, password) values ('customer', 'customer@email.com', 'password');

-- insert into Restaurants(name) values ('le eaterinos');

-- insert into Staff(rid, name, email, password) values (1, 'staff', 'staff@email.com', 'password');

-- insert into Riders(name, email, password) values ('rider', 'rider@email.com', 'password');

-- insert into FDS(name, email, password) values ('fds', 'fds@email.com', 'password');