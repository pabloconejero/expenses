const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Record = sequelize.define('Record', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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
  Record.associate = (models) => {
    // A Record belongs to a User
    Record.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE', // Delete records when the user is deleted
    });
  };

  return Record;
};
