const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.social_login = require("../models/social_login.model.js")(
  sequelize,
  Sequelize
);
db.user_device = require("../models/user_devices.model.js")(
  sequelize,
  Sequelize
);

db.plan = require("../models/plan.model.js")(sequelize, Sequelize);

db.subscription = require("../models/subscription.model.js")(
  sequelize,
  Sequelize
);
db.advertisement = require("../models/advertisement.model.js")(
  sequelize,
  Sequelize
);

db.compaign = require("../models/compaign.model.js")(sequelize, Sequelize);

db.social_login.belongsTo(db.user, { foreignKey: "user_id" });

db.user_device.belongsTo(db.user, { foreignKey: "user_id" });

db.subscription.belongsTo(db.user, { foreignKey: "user_id" });
db.subscription.belongsTo(db.plan, { foreignKey: "plan_id" });

db.advertisement.belongsTo(db.user, { foreignKey: "user_id" });

db.compaign.belongsTo(db.user, { foreignKey: "user_id" });
db.compaign.belongsTo(db.advertisement, { foreignKey: "advertisement_id" });

module.exports = db;
