module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(1234),
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    first_name: {
      type: Sequelize.STRING(60),
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING(60),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    profile_image: {
      type: Sequelize.STRING(60),
      allowNull: false,
      defaultValue: "/images/avatars/avatar.png",
    },
  });

  return User;
};
