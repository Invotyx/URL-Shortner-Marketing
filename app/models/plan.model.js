module.exports = (sequelize, Sequelize) => {
  const Plan = sequelize.define("plans", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    apple_product_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    google_product_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    limit: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });

  return Plan;
};
