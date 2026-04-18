module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // PK id skapas automatiskt som int 
    first_name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true // Viktigt för inloggning
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    tableName: 'users', 
    timestamps: true,  
    underscored: true   
  });

  User.associate = (models) => {
    // En användare kan ha en varukorg 
    // Detta skapar kopplingen där cart tabellen får user_id 
    User.hasOne(models.Cart, { foreignKey: 'user_id' });
  };

  return User;
};
