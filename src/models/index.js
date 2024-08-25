const sequelize = require("../config/database");
const User = require("./user");
const Task = require("./task");

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Task,
};
