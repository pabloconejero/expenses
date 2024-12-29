const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Expense = sequelize.define('Record', {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'records', // Database table name
    timestamps: true, // Automatically adds createdAt and updatedAt
  });

  // Define relationship (Many-to-One with User)
  Expense.associate = (models) => {
    // A Record belongs to a User
    Expense.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE', // Delete records when the user is deleted
    });
  };
  
  return Expense;
};
