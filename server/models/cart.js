module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Startar som obetald 
    }
  }, {
    tableName: 'cart',
    timestamps: true,
    underscored: true // Skapar created_at och updated_at
  });

  Cart.associate = (models) => {
    // En varukorg tillhör en användare 
    Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    // En varukorg kan innehålla många produkter via cart_row 
    Cart.belongsToMany(models.Product, { 
      through: models.CartRow, 
      foreignKey: 'cart_id' 
    });
  };
  

  return Cart;
};