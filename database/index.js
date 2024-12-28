const Sequelize = require('sequelize')
const User = require('../models/user.model')

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
})

function dbHello() {
    console.log('Initiating DB Connection')
    database.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

    try {
        database.authenticate()
        console.log('Database connection OK')
    } catch (error) {
        console.log('Database connection failure')
    }
}

module.exports = dbHello