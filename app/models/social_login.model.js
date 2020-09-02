module.exports = (sequelize, Sequelize) => {
  const SocialLogin = sequelize.define("social_logins", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    provider: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    social_id: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });

  return SocialLogin;
};
