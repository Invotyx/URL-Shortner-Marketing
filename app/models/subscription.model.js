module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("subscriptions", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    plan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    payment_method: {
      type: Sequelize.ENUM({
        values: ["apple", "google"],
      }),
      allowNull: false,
    },
    expires_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return Subscription;
};
