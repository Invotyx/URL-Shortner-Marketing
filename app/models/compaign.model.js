module.exports = (sequelize, Sequelize) => {
  const Compaign = sequelize.define(
    "compaigns",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      advertisement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      internal_url: {
        type: Sequelize.STRING(6),
        unique: true,
        allowNull: false,
      },

      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );

  return Compaign;
};
