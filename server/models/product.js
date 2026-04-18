module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT 
    },
    price1: { 
      type: DataTypes.DOUBLE, 
      allowNull: false,
      defaultValue: 0
    },
    price2: { 
      type: DataTypes.DOUBLE, 
      allowNull: false,
      defaultValue: 0
    },
    price3: { 
      type: DataTypes.DOUBLE, 
      allowNull: false,
      defaultValue: 0 
    },
    price4: { 
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    custom_price1: { 
      type: DataTypes.DOUBLE, 
      defaultValue: 0 
    }, 
    custom_price2: { 
      type: DataTypes.DOUBLE, 
      defaultValue: 0 
    },
    custom_price3: { 
      type: DataTypes.DOUBLE, 
      defaultValue: 0 
    },
    custom_price4: { 
      type: DataTypes.DOUBLE, 
      defaultValue: 0 
    },
    custom_image_pruduct: { 
      type: DataTypes.STRING 
    },
    image_url: { 
      type: DataTypes.STRING 
    },
    category: { 
      type: DataTypes.STRING, 
      defaultValue: "Pizzor" // Standardkategori om ingen anges
    }
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true // Viktigt för att matcha database_id istället för databaseId
  });

  Product.associate = (models) => {
    // Koppling till betyg (En produkt har många betyg)
    Product.hasMany(models.Rating, { foreignKey: 'product_id' });
    
    // Koppling till varukorg (Många-till-många via CartRow)
    // Detta krävs för att varukorgslogiken ska fungera
    Product.belongsToMany(models.Cart, { 
      through: models.CartRow, 
      foreignKey: 'product_id' 
    });
  };

  return Product;
};