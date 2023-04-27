# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup

    npm install
    npm install nodemon
    npm install axios
    npm install mongoose

### Before startup
You need a MongoDB database ready.

Make sure you have a collection named 'org' in your database that contains at least one organization with the orgid listed in your environment variable (see below).

Setup a .env file with the following variables: MONGO_URL, PORT and ORG

    MONGO_URL=mongodb+srv://4339group22:lindner@4339group22cluster.oxqlqta.mongodb.net/DataPlatformProject
    PORT=3000
    ORG="6439c6736be20c13801a39a1"

### Compiles and hot-reloads for development

    npm start

## Postman Documentation

Can be found at <https://documenter.getpostman.com/view/27053458/2s93Y5PKmf>
