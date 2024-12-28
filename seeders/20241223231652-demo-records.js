'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, we need to fetch some user IDs to associate with the records.
    const users = ["1","2","3"]

    // Create sample records for each user
    const records = users.map(user => ({
      userId: user,
      date: new Date(), // Current date
      amount: (Math.random() * 1000).toFixed(2), // Random amount between 0 and 1000
      note: `Sample record for user ${user.id}`, // A note for each record
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    console.log(records)
    // Insert the records into the 'records' table
    await queryInterface.bulkInsert('records', records);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all records for this seeder
    await queryInterface.bulkDelete('records', null, {});
  },
};
