// models/rating.js
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'ratings',
    timestamps: true,
    underscored: true
  });
  Rating.associate = (models) => {
  // Ett betyg hör till en specifik produkt 
  Rating.belongsTo(models.Product, { foreignKey: 'product_id' });
};
  return Rating;
};
