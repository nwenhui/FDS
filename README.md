# FDS

- frontend is for the frontend stuff LOL
- backend is for the api stuff
- database for the sql files

(frontend-old is last time stuff can ignore hehe)

to run server:
1. setup new database in postgres (if not done before)
2. run init.sql file (in database folder) for the database u wanna use for this application
3. go into the .env file in backend and change DATABASE_URL to whatever ur url is
    - postgresql://[user[:password]@][netloc][:port][/dbname]        <- formula for database url
    - ignore square brackets when typing url
    - ignore :password if ur postgres dont have password
    - save the file hehe
3. cd backend
4. npm run setup

to run client:
1. cd frontend
2. npm install
3. npm start

***** 
- run 'npm install' in the folder after cloning/pulling
- make sure to run server first then client (so server is on localhost:3000)
***** 
- log in and sign up functions should be working (i dunno i hope so bro)
- can try searching for restaurants but no restaurants in database so will always return nth
- have to look at console for search results LOL cos i dunno how to pass the state to another page TT
- create new restaurants in postgres: "insert into restaurants(name) values('WHATEVER U WANNA NAME THE RESTAURANT');"