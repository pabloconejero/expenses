'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample users to be inserted
    const users = [
      {
        email: 'john.doe@example.com',
        fullName: 'John Doe',
        username: 'john_doe',
        password: 'password123', // Plain text, will be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.smith@example.com',
        fullName: 'Jane Smith',
        username: 'jane_smith',
        password: 'securepassword456', // Plain text, will be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'mike.jones@example.com',
        fullName: 'Mike Jones',
        username: 'mike_jones',
        password: 'mypassword789', // Plain text, will be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Hash the passwords before inserting
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10); // Hash each password
    }

    // Insert the users into the 'users' table
    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all users inserted by this seeder
    await queryInterface.bulkDelete('users', null, {});
  },
};
