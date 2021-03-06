// The Bookshelf library is initialized by passing an initialized Knex client instance. 
// The knex documentation provides a number of examples for different databases.
// http://knexjs.org/
const dbConfig;
const knex = require('knex')(dbConfig);

dbConfig = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'toads'
  }
};

// This initialization should likely only ever happen once in your application. 
// As it creates a connection pool for the current database, 
// you should use the bookshelf instance returned throughout your library. 
// You'll need to store this instance created by the initialize 
// somewhere in the application so you can reference it.

const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;

// elsewhere, to use the bookshelf client:

// var bookshelf = require('./bookshelf');
// * * * TEMPLATE BOOKSHELF TABLE INSTANCES OF OUR DATABASE * * * // 

const Trips = bookshelf.Model.extend({
  tableName: 'trips',
  users: function() {
    return this.hasMany(Users);
  }
});


const TripsToads = bookshelf.Model.extend({
  tableName: 'trips_toads',
  trips: function() {
    return this.belongsToMany(Trips);
  },
  users: function() {
    return this.hasMany(Users);
  }
});

const Users = bookshelf.Model.extend({
  tableName: 'users',
  trips: function() {
    return this.belongsToMany(Trips);
  }
})

