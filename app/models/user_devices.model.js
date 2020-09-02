module.exports = (sequelize, Sequelize) => {
  const UserDevice = sequelize.define("user_devices", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    device_name: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    device_id: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
  });

  return UserDevice;
};
