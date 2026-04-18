module.exports = (sequelize, DataTypes) => {
  const CartRow = sequelize.define('CartRow', {
    amount: {
      type: DataTypes.DOUBLE, // Antal produkter 
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'cart_row',
    timestamps: true,
    underscored: true // Skapar created_at och updated_at 
  });

  return CartRow;
};