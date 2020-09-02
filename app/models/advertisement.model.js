module.exports = (sequelize, Sequelize) => {
  const Advertisement = sequelize.define(
    "advertisements",
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
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      display: {
        type: Sequelize.ENUM({
          values: ["title", "image", "both"],
        }),
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      is_default: {
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

  return Advertisement;
};
