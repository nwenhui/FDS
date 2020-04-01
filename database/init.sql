drop table if exists Customers cascade;
drop table if exists Restaurants cascade;
drop table if exists Staff cascade;
drop table if exists Riders cascade;
drop table if exists FDS cascade;

-- list of customer details & login
create table Customers (
    id serial primary key,
    email varchar(100) unique not null,
    first_name varchar(100),
    last_name varchar(100),
    password varchar(100) not null,
    is_admin bool default(false),
    created_on date not null
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