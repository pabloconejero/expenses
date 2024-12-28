const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // For password hashing

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates email format
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures it is not empty
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20], // Must be between 3 and 20 characters
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Minimum 8 characters
        notEmpty: true,
      },
    },
  }, {
    tableName: 'users', // Database table name
    timestamps: true, // Automatically adds createdAt and updatedAt
    hooks: {
      beforeCreate: async (user) => {
        // Hash the password before saving to the database
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  });

  // Optional: Define instance methods for reuse in controllers
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    // A User has many Records
    User.hasMany(models.Record, {
      as: 'expenses',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
          onDelete: 'CASCADE',
  })}
  return User;
}
